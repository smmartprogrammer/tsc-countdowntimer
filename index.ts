#! /usr/bin/env node

import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import figlet from 'figlet';


const sleep = (v: number) => new Promise(r => setTimeout(r, v));


async function counterTitle() {
    figlet.text("Countdown Timer", function (err, data) {
        if (err) console.log(err)
        console.log(chalk.yellow(`${data}`))
    });

}

counterTitle()

let counterFunctionality = async (month: string, date: number, hour: number) => {

    setInterval(() => {

        let userTime = new Date(`${month} ${date}, 2023 0${hour}:00:00`).getTime();
        let now = new Date().getTime();

        let diff = userTime - now;

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        console.log(chalk.blue(`${days}d : ${hours}hr : ${minutes}m : ${seconds}s`))
    }, 1000)
}


let counterTimeGetter = async () => {
    let counterTime = await inquirer.prompt([{
        name: 'month',
        type: 'list',
        message: chalk.hex('#FFA500')('From Which month you want to start the countdown timer? '),
        choices: ['Jan', 'Feb', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },
    {
        name: 'date',
        type: 'number',
        message: chalk.hex('#FFA500')('Please enter the date? '),
    },
    {
        name: 'hour',
        type: 'list',
        message: chalk.hex('#FFA500')('Please enter the hour? '),
        choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    },

    ])

    const spinner = createSpinner(chalk.yellow('Counter is starting ... \n')).start()

    await sleep(3000)
    spinner.success()
    await sleep(2000)

    await counterFunctionality(counterTime.month, counterTime.date, counterTime.hour)

}


await sleep(2000)
await counterTimeGetter()