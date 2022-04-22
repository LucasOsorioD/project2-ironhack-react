function filterTasksByProject(tasksList, projectId){
    const filteredTasks = tasksList.filter( task => task.projectId === projectId)
    return filteredTasks
}

function calculateWorkProgress(tasksList, completedTasks, projectId){
    return filterTasksByProject(Math.round(completedTasks.length / tasksList) * 100)
}