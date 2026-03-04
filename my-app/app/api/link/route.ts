import { NextRequest, NextResponse } from "next/server";
import { isEmpty, isValidUrl } from "@/lib/helper/validators";
import { badRequest, success } from "@/lib/helper/response";
import { prisma } from "@/lib/prisma";
import base62 from "base62";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json(); 

        const {original } = body;
        if(isEmpty(original) || !isValidUrl(original)) 
            return badRequest("Invalid URL");

        const existLink = await prisma.uRLS.findFirst({
            where: {original_url: original},
            select: {short_url : true}
        });    
        if(existLink) 
            return existLink;
        
        const createShortLink = await prisma.$transaction(async (tx) => {
            const record = await tx.uRLS.create({ 
                data: {
                    original_url: original, 
                    short_url: ""
                }
            });
            
            const shortLink =  base62.encode(Number(record.id)); 
            const update = await tx.uRLS.update({ 
                where: {id: record.id}, 
                data: {short_url: shortLink}
            });
            return update; 
        })

        return success("Create new link successfully",createShortLink.short_url)
    }catch(err){
         console.error("", err); 
        return NextResponse.json(
            {error: "Internal sever error"}, 
            {status: 500}
        );
    }
}

