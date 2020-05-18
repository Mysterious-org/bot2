const request = require('node-superfetch');
const fsn = require("fs-nextra");
module.exports.run = async (bot, message, args, funcs) => {
        const {
            Canvas
        } = require('canvas-constructor');
        if (message.mentions.users.size < 1) return send("No mentions found in your message.");
        const user_input = args.slice(1).join(' ');
        const getSlapped = async (person) => {
            const plate = await fsn.readFile('./assets/images/bye-mom.png');
            const png = person.replace('.gif', '.png');
            const {
                body
            } = await request.get(png);
            return new Canvas(680, 632)
                .addImage(plate, 0, 0, 680, 632)
                .rotate(-25.5 * (Math.PI / 180))
                .setTextFont('26px Impact')
                .addText(`${user_input}`, 62, 708)
                .rotate(25.5 * (Math.PI / 180))
                .addImage(body, 84, 327, 169, 169, {
                    type: 'round',
                    radius: 85
                })
                .toBuffer();
        };
        try {
            const person = message.mentions.users.first().avatarURL;
            const result = await getSlapped(person);
            await message.channel.send({
                files: [{
                    attachment: result,
                    name: 'byemom.png'
                }]
            });
        } catch (error) {
            throw error;
        }
};

module.exports.config = {
    name: "byemom",
    aliases: [],
    usage: "",
    commandCategory: "canvas",
    cooldownTime: '0'
  };