Quasar
======

[![Node.js](https://img.shields.io/static/v1?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATwSURBVEhLpZZZaB1VGMe/OTM3S1MTK2hTakWjxQcpSKiIqbEo+GL1oUgFsVbB0lbQGmhAxa0xEixFpdUHFbSEimKKIorW0tQF0TcFURBFSUIbjW1ub+4+y1n8f2fmZr33ZvHPPefOcmZ+51vOd8ahZerxj3a2uNK5s7Gh8Ui5HMkgVM+99fB77ye3l6xlgZ/6Ylc3KfGqQ+5moxzSylA+H5JU6lQuX3jmw55Pf0yGLqolgfcN3XtlS3PTsynhPuAYdzUZQQw2iigMFZX8iFzB18zbf/w52ntm4Lt88mhN1QUfGN7RZqTT47pej1DupUJjuHZpNlihlUoBaUOAOySEE8hQPnly6IfXR0+N6ORVC1QVvOfzbS1COVubVzW9IYx7DRoJAIUWAKPNA6tIU9EPyHWFtRxwcgyNCE/0vXb/u4PJa+doAXj/N9u6YeVBIbw7hPbIQhcBc6zLfkjKmBjuIAsAd4VL2jFf6UjtObpr8K8EYTUN3nn89rWXtDf0pTzxCJzmOQbQBeDqrmawlIrKQUTCZWBseex69gCZKJJvFgrlF97ZN3SBeZg+0Y4j97TL4uqfhUd7MRWPr61EDOVJaAScm0IzWnP8nVQq9ajb7P7edbBrjR3LHVzSZkKx1s/Amv8hARcbuFtbmLbH7H5kOy85Grtwfo2bEpfZsbYTnnFhbmmiATOsmm9LFJ7Fjy21FjOUjzGJiakMlcMwGZeAPY4HJwXiGmRW7GkIawo/tlix1fwPeIj4p3NTgM0YFVucJAQnQjAJq5E4K1P8nHU1N443wOlCjrDicJcTyCLj3qY+W4yGI/LTKXtz+UIW2R4VTUoLD6MI4Dwh/BCSz46ogO3CZ3hsucw1kI5WYjWSK3ksUtImFEPtVJiM5sQzSFyN3rFrDo3huFmeXEmGs60zygUl8mGxcFz7Trw+sTwBOza+PIEZ+Ll/slTAzjNXyVN1NHuE0srCOHkZHk/AIiuRRvmxVjOcKFsuUin06ezY/E1mrkVVNW9ICJd7oKcQTp6AhzLKisGo6KiHaFh7CP8kspBVKkm6mC7b45WKi4iFw8d22bJlkO0VLNYugzVd5NRHRlZ09lw8iaWqklyz5asIfZy4DGfZPhIRSUdSWYU0mZvrXt7oJ84XkrPFxc6bL7a6gNC5NsazXB2JgJQT0L/pLNbewifPjWexNHhPXzy5amVBpCWqGJINsWbZPnD81FSxRMXi/CyOpQD9eyKbnNUT16bayvpFxHoW2BfheDYdZuyVGpqYzFMQzcS+umBvHbJSamQyk5/Zjz/b/v2UEemrlFQv8nk1sdWj4+nkrJZAreZrQ4Ew4hVZlFuGnz9js3XB/La+3L1JSz2AonJ3cmmObty4gVqamqt+gUQ4ifAfwjP44kPVCkwpCr/Ex8CB4ae//i15hVVNx9x2qHs3tpZerI/rk0tWrS3NtKljQw2wtksRnznky/CnKIr6W1pbTx7f/UGQPD6terlAG7d3OOtuWv8EDg+jTW/UN1y9ntpW4fO6isVS6gzgfcbRxwb3nqhZBOqCK+rq33y55zYz/CE+b2pIUed1HfPAMocN/5OgGPQee+yETaB6WhK4oi0v3dzpCLcfhe+ua9e10xWtbdgIUB+k+RZW7j/64OAvydBFtSxwRbcO3HJfo9d4uLOjo4DCcmjs1/Ghj/tP+8ntJYjoP+8koCNR9W71AAAAAElFTkSuQmCC&label=Node.js&message=16.9.0&color=brightgreen)](https://nodejs.dev/) [![License](https://img.shields.io/badge/license-MIT-blue.svg?label=License&link=https://mit-license.org/)](./LICENSE)

## Setup

**Make sure you have `Node.js` v16 and `npm` v7 installed.**

Install all dependencies from a terminal in the root of the project:
```bat
npm install
```

Create a new app [here](https://discord.com/developers/applications) and add a bot to the application. Make sure to enable `server members intent`. Using the OAuth2 > URL Generator, select `bot` and `application.commands`, set the bot permissions to the desired settings (Administrator in the case of Quasar), and follow the generated link to add your bot to a server.

Create a `.env` file in the root of the project and fill it out following the structure of the `.env.example` file. Your bot token can be found under the bot tab of the developer portal, and the client/application id from the general tab.

## NPM Scripts

| Script        | Description |
| :------------ | :---------------------------------------- |
| build         | Compiles the TypeScript into JavaScript   |
| start         | Starts the bot                            |
| update-{type} | Updates the node package's {type} version |

## License
This code is licensed under the [MIT License](./LICENSE)
