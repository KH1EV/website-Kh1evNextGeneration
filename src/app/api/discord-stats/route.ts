import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
  try {
    const token = process.env.DISORD_TOKEN || process.env.DISCORD_TOKEN;
    const serverId = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || '1065405418349797417';

    if (!token) {
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
    }

    const res = await fetch(`https://discord.com/api/v10/guilds/${serverId}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${token}`,
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch Discord stats' }, { status: res.status });
    }

    const data = await res.json();
    
    return NextResponse.json({
      total: data.approximate_member_count || 0,
      online: data.approximate_presence_count || 0,
      offline: (data.approximate_member_count || 0) - (data.approximate_presence_count || 0)
    });
  } catch (error) {
    console.error('Error fetching discord stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
