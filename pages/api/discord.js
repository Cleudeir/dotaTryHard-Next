// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// start
import discord from '../../back/discord';

const client = require('discord.js');

export default function Disc(req, res) {
  const bot = new client.Client({
    intents: [
      client.Intents.FLAGS.GUILDS,
      client.Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  const Bot = async () => {
    bot.login(process.env.token);
    bot.on('ready', () => {
      console.log('✔️  Bot foi iniciado');
      res.status(200).json('✔️  Bot foi iniciado');
    });

    let dataRanking = [];
    async function pull() {
      const { data } = await discord();

      dataRanking = data;
      console.log(dataRanking ? dataRanking.length : 'Error');
      return data;
    }
    pull();
    setInterval(pull, 60 * 60 * 1000);

    bot.on('message', async (message) => {
      if (message.author.bot) return;
      if (message.channel.type === 'dm') return;
      if (!message.content.startsWith(process.env.prefix)) return;

      const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
      const [comando, info] = args.shift().toLowerCase().split('=');

      // comando ping
      if (comando === 'p') {
        const m = await message.channel.send('Ping?');
        m.edit(`A sua Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
      }
      if (comando === 'help' || comando === '?') {
        const m = await message.channel.send('help?');
        m.edit(`
        
        !p => Verifica seu ping
        !r=account_id => Verifica seu ranked e seu status médio
        !help => Mostra os comandos disponíveis
        `);
      }
      if (comando === 'r') {
        if (dataRanking) {
          const [playerData] = dataRanking.filter((x) => +x.account_id === +info);
          console.log(playerData);
          if (playerData) {
            console.log(playerData);
            await message.channel.send({ files: [playerData.avatarfull] });
            const m = await message.channel.send('Ranking...');
            m.edit(
              `Aqui esta  ${playerData.personaname}:
            ➡️ Position: ${playerData.id} de ${dataRanking.length}
            Rating : ${playerData.ranking.toLocaleString('pt-BR')}  
            Kill/Deaths/Assists = ${playerData.kills}/${playerData.deaths}/${playerData.assists}
            Last/Denies = ${playerData.last_hits}/${playerData.denies}
            GPM = ${playerData.gold_per_min.toLocaleString('pt-BR')}
            XPM = ${playerData.xp_per_min.toLocaleString('pt-BR')}
            Hero damage = ${playerData.hero_damage.toLocaleString('pt-BR')}
            Tower damage = ${playerData.tower_damage.toLocaleString('pt-BR')}
            Hero healing = ${playerData.hero_healing.toLocaleString('pt-BR')}   
            Win/Loss = ${playerData.win}/${+playerData.matches - +playerData.win}
            Win rate = ${playerData.winRate}%

            veja o ranking completo: https://dota-try-hard.vercel.app/${playerData.account_id}
            `,
            );
          } else {
            await message.channel.send(`
            Infelizmente você não esta no ranking
            busque no site: https://dota-try-hard.vercel.app/`);
          }
        } else {
          await message.channel.send('Desculpe! DataBase esta offline');
        }
      }
    });
  };
  Bot();
}
