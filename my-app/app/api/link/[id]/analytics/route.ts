import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, success } from "@/lib/helper/response";


export async function GET(req: NextRequest, context: {params: Promise<{id: string}>}) {
    try {
        const params = await context.params;
        const shortID = params.id;     
        if(!shortID) { 
            return badRequest("Link does not exist");
        }
        const visit = await prisma.uRLS.findFirst({
            where: { short_url: shortID },
            select: {
                id: true,
                short_url: true,
                original_url: true,
                visits: {
                orderBy: { createdAt: "desc" },
                select: {
                    ip: true,
                    country: true,
                    browser: true,
                    os: true,
                    deviceType: true,
                    createdAt: true,
                    },},  _count: {select : {visits: true}}
            },
           
        });        
        if(!visit) 
            return badRequest("urlID dose not exist")

        const countCountry = await prisma.visit.groupBy ({
            by: ["country"], 
            where: {urlId : visit.id },
            _count: {country: true}
        })

        const countDeviceType = await prisma.visit.groupBy ({
            by: ["deviceType"], 
            where: {urlId : visit.id },
            _count: {deviceType: true}
        })

        return success({
            totalVisits: visit._count.visits,
            originalUrl: visit.original_url,
            shortUrl: visit.short_url,
            visit: visit.visits,
            countCountry,
            countDeviceType
        }, "Get visit information successfully");
    } catch(err) { 
        console.error("", err); 
                return NextResponse.json(
                    {error: "Internal sever error"}, 
                    {status: 500}
                );        
        }
}