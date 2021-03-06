## **[5.1.0]** - 2022-04-11
* Added mute and unmute commands
* Now only uses slash commands to meet Discord's bot changes

## **[5.0.0]** - 2022-01-15
* Added support for application slash commands

## **[4.3.0]** - 2021-09-26
* Added CodeQL Analysis code checking GitHub workflow
* Added security doc files to tell people how to report security vulnerabilities
* Added a contributing file outlining how to contribute to the project

## **[4.2.1]** - 2021-09-22
* Enabled the channels partial to recieve DMs
* Converted the `messageCreate` DM check to use the `Message.channel.type` instead of checking for a guild

## **[4.2.0]** - 2021-09-18
* Added permission checks for commands
* Added a `guildOnly` flag to all commands to ensure all parameters will exist when needed

## **[4.1.0]** - 2021-09-18
* Converted commands loader to be asynchronous

## **[4.0.0]** - 2021-09-18
* Extracted all the client events to the `events` folder to keep messy logic out of the main bot file

## **[3.0.0]** - 2021-09-15
* Extracted the command loader to the `util` folder to keep messy logic out of the main bot file
* Re-ordered some imports to keep consistent

## **[2.0.0]** - 2021-09-13
* Added an automatic command loader to load all command files
* Added an avatar command to render a user's avatar
* Changed the ping command to use an embed and display both client and API latency

## **[1.1.0]** - 2021-09-11
* Added a hard-coded ping command.
* Started using `tsc-alias` for relative import mappings

## **[1.0.0]** - 2021-09-09
* Bot logs in and a message is printed to the console.
