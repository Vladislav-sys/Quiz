export interface State {
    isLoading: boolean
    isError: boolean
    curQuestion: number
    result: number
    questions: Array<{
        questionText: string
        correct: number
        userAnswer: number
        answers: string[]
    }>
}

export type Action =
    | {
          type: 'FETCH_FAIL' | 'NEXT_QUESTION'
      }
    | {
          type: 'FETCH_SUCCESS'
          payload: Record<string, any>
      }
    | {
          type: 'USER_ANSWER'
          payload: number
      }

function cloneState(state: State): State {
    return {
        ...state,
        questions: state.questions.map((q) => {
            return { ...q, answers: q.answers.slice() }
        }),
    }
}

export function reducer(state: State, action: Action): State {
    const newState: State = cloneState(state)

    if (action.type === 'FETCH_SUCCESS') {
        newState.isLoading = false
        newState.curQuestion = 0

        const questions: State['questions'] = []

        for (let q of action.payload.results) {
            const correctPos: number = Math.floor(Math.random() * 4)

            const arr = [...q.incorrect_answers]
            arr.splice(correctPos, 0, q.correct_answer)
            questions.push({
                questionText: q.question,
                correct: correctPos,
                userAnswer: -1,
                answers: arr,
            })
        }

        newState.questions = questions

        return newState
    }

    if (action.type === 'FETCH_FAIL') {
        newState.isLoading = false
        newState.isError = true
        return newState
    }

    if (action.type === 'NEXT_QUESTION') {
        newState.curQuestion++
        return newState
    }

    if (action.type === 'USER_ANSWER') {
        const curQ = newState.questions[newState.curQuestion]
        curQ.userAnswer = action.payload
        if (curQ.userAnswer === curQ.correct) newState.result++
        return newState
    }

    return newState
}
