export async function GET() {
    try {
        return Response.json({});
    } catch (error: any) {
        return Response.json({
            error: error.message
        });
    }
}