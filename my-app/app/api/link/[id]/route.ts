import { badRequest } from "@/lib/helper/response";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { v4 as uuidv4 } from 'uuid';
import geoip from "geoip-lite";
import UAParser from "ua-parser-js";
export async function GET(req: NextRequest, context: {params: Promise<{id: string}>}) {
    try{
        const params = await context.params; 
        const shortLink = params.id; 
        if(!shortLink)
            return badRequest("Link does not exist");

        const original = await prisma.uRLS.findFirst({
            where: {short_url: shortLink}, 
            select: {original_url: true, id : true}
        });
        if(!original)
            return badRequest("Link does not exist");
        
        //get/set device ID 
        let deviceid = req.cookies.get("device_id")?.value;
        const response = NextResponse.redirect(original.original_url);

        if(!deviceid) { 
            deviceid = uuidv4()
            response.cookies.set("device_id", deviceid,{
                httpOnly: true, 
                maxAge: 60 * 60 * 24 * 365,
                path: "/"
            });
        }
        //Get iP address
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                   req.headers.get("x-real-ip") || "unknown";
        //contry
        const country = geoip.lookup(ip)?.country;
        //user-agent
        const uaString = req.headers.get("user-agent") || "";
        const parser = new UAParser(uaString);

        const browser = parser.getBrowser()?.name || "unknown";
        const os = parser.getOS()?.name || "unknown";
        const deviceType = parser.getDevice()?.type || "desktop";

        await prisma.visit.create({
            data: {
                urlId: original.id,
                deviceId: deviceid,
                ip: ip, 
                country: country,
                browser: browser, 
                os: os, 
                deviceType: deviceType
            }
        })
                
        return response;
    }catch(err){ 
        console.error("", err); 
        return NextResponse.json(
            {error: "Internal sever error"}, 
            {status: 500}
        );
    }
}