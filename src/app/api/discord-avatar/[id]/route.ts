import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!id) {
    return new NextResponse('No ID provided', { status: 400 });
  }

  try {
    const token = process.env.DISORD_TOKEN || process.env.DISCORD_TOKEN;
    if (!token) {
      console.error('DISORD_TOKEN is missing in environment variables');
      return new NextResponse('Bot token not configured', { status: 500 });
    }

    const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
      headers: {
        Authorization: `Bot ${token}`,
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch Discord user ${id}: ${res.status} ${res.statusText}`);
      const defaultIndex = (BigInt(id) >> BigInt(22)) % BigInt(6);
      return NextResponse.redirect(`https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`);
    }

    const user = await res.json();
    
    let avatarUrl = '';
    if (user.avatar) {
      const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
      avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
    } else {
      if (user.discriminator === "0" || user.discriminator === "0000") {
         const defaultIndex = (BigInt(user.id) >> BigInt(22)) % BigInt(6);
         avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
      } else {
         const defaultIndex = parseInt(user.discriminator) % 5;
         avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
      }
    }

    return NextResponse.redirect(avatarUrl);
  } catch (error) {
    console.error(`Error in discord-avatar route for ${id}:`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
