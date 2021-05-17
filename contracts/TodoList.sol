pragma solidity ^0.5.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool isComplete;
    }

    event TaskCreated(uint256 id, string content);
    event TaskCompleted(uint256 id, bool isComplete);

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Try to create more tasks!");
    }

    function createTask(string memory _content) public {
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content);
        taskCount++;
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.isComplete = !_task.isComplete;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.isComplete);
    }
}
