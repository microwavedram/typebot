import { Command } from "src/util/Command"
import { SlashCommandBuilder, Embed } from "@discordjs/builders"

export const cmd: Command = {
    name: "update",
    description: "Send Lastest Update to Channel",
    command: () => {
        return new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description)

        .setDefaultPermission(false)
        
        .addBooleanOption((option) => option.setName("sure")
            .setDescription("Are you sure you know what you are doing?")
            .setRequired(true)
        )
        .addChannelOption((option) => option.setName("channel")
            .setDescription("Channel to send update to")
            .setRequired(true)
        )
    },
    execute: async (interaction) => {
        const update = require("../../update.json")
        const channel = interaction.options.getChannel("channel")
        
        if (channel?.type != "GUILD_TEXT") { interaction.reply("You can only send to text channels."); return }

        let a = update["update"]["additions"].map((value:string) => value.concat("\n")).join()
        let r = update["update"]["removals"].map((value:string) => value.concat("\n")).join()
        let b = update["update"]["fixed"].map((value:string) => value.concat("\n")).join()

        const embed = new Embed()
        .setColor(6066407)
        .setTitle(`${update["game"]} ${update["version"]}:${update["patch"]}`)
        .setAuthor({name: "Updates"})
        .setDescription(`**Features**
\`\`\`diff
${a}
\`\`\`**Removals**
\`\`\`diff\n
${r}
\`\`\`**Fixed Bugs**
\`\`\`ini\n
${b}
\`\`\`
        `)

        channel.send({embeds: [embed]})
        interaction.reply("Sent Message")
    }
}

        