pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool isComplete;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("Try to create more tasks!");
    }

    function createTask(string memory _content) public {
        tasks[taskCount] = Task(taskCount, _content, false);
        taskCount++;
    }
}
