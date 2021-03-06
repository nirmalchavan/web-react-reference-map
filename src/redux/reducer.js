
function getId(state) {
    return state.todos.reduce((maxId,todo) => {
            return Math.max(todo.id, maxId)
        }, -1) +1
}

let reducer = function(state, action){
    switch (action.type) {
        case 'ADD_TODO':
            console.log('got to correct ADD_TODO case')
            return Object.assign({}, state, {
                todos:[{
                    //add to do info
                    text: action.text,
                    completed: false,
                    id: getId(state)
                }, ...state.todos]
            })
        case 'COMPLETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    return todo.id === action.id ?
                        Object.assign({}, todo, {completed: !todo.completed}) : todo
                })
            })

        case 'DELETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter((todo) => {
                    return todo.id !== action.id
                })

            })

        default:
            return state;
    }
}

export default reducer


