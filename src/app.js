const Web3 = require('web3')
const TruffleContract = require('truffle-contract')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
async function prompt(s) {
    return new Promise((resolve, reject) => {
        readline.question(s, resp => {
            resolve(resp)
        })
    })
}


App = {

    contracts: {},

    load: async () => {
        // load app...
        console.log('app loading...')
        App.loadWeb3()
        await App.loadAccount()
        await App.loadContracts()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: () => {
        App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545")
        App.web3 = new Web3(App.web3Provider)
    },

    loadAccount: async () => {
        App.account = (await App.web3.eth.getAccounts())[0]
    },

    loadContracts: async () => {
        const contract = require('../build/contracts/TodoList.json')
        App.contracts.TodoList = TruffleContract(contract)
        App.contracts.TodoList.setProvider(App.web3Provider)

        App.todoList = await App.contracts.TodoList.deployed()
    },

    getTasks: async () => {
        let count = await App.todoList.taskCount()
        count = count.toNumber()
        return Promise.all([...Array(count).keys()].map(async i => {
            const task = await App.todoList.tasks(i)
            return {
                id: task.id.toNumber(),
                content: task.content,
                isComplete: task.isComplete
            }
        }))
    },

    createTask: async (content) => {
        return App.todoList.createTask(content, { from: App.account })
    },

    toggleCompleted: async (id) => {
        return App.todoList.toggleCompleted(id, { from: App.account })
    }
    
}

const logTasks = tasks => tasks.forEach((t) => {
        console.log(`[${t.id}] ${t.content} (${t.isComplete ? 'Done' : 'Pending...'})`)
    })

const main = async () => {
    await App.load()
    console.log("Account:", App.account)
    console.log("TodoList Contract:", App.todoList.address)
    let tasks = await App.getTasks()
    logTasks(tasks)

    const actions = {
        'add': async () => {
            return App.createTask(await prompt('New Task: '))
        },
        't': async () => {
            return App.toggleCompleted(Number(await prompt('Task ID: ')))
        }
    }

    while (true) {
        console.log('')
        console.log(Object.keys(actions))
        let choice = await prompt('Action ? ')
        await actions[choice]()

        tasks = await App.getTasks()
        console.log()
        logTasks(tasks)
    }



    debugger
}
main()