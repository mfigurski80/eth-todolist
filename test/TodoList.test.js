const { assert } = require("chai")

const TodoList = artifacts.require("./TodoList.sol")

contract('TodoList', (accounts) => {
    let todoList

    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async () => {
        const count = await this.todoList.taskCount()
        const task = await this.todoList.tasks(count)
        assert.equal(task.id.toNumber() + 1, count.toNumber())
        assert.isTrue(count.toNumber() >= 1)
    })

    it('has correct default task', async () => {
        const task = await this.todoList.tasks(0)
        assert.equal(task.id.toNumber(), 0)
        assert.equal(task.content, "Try to create more tasks!")
    })
})