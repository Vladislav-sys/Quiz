import { useReducer, useEffect, useRef } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { FaCrown } from 'react-icons/fa'
import { type State, reducer } from './reducer'
import { type Settings } from './App'
import classes from './Quiz.module.css'
import bestFace from './assets/best.svg'
import goodFace from './assets/good.svg'
import badFace from './assets/bad.svg'

type Props = { handleQuizEnd: () => void } & Omit<Settings, 'isQuiz'>

const initialState: State = {
    isLoading: true,
    isError: false,
    result: 0,
    curQuestion: -1,
    questions: [],
}

function Quiz({ handleQuizEnd, amount, category, difficulty }: Props) {
    const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState)

    const rf = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!state.isLoading) return

        fetch(
            `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`
        )
            .then((res) => res.json())
            .then((obj) => {
                if (obj.response_code === 1) throw new Error('Empty JSON')
                dispatch({ type: 'FETCH_SUCCESS', payload: obj })
            })
            .catch((e) => {
                console.log(e)
                dispatch({ type: 'FETCH_FAIL' })
            })
    }, [state.isLoading])

    useEffect(() => {
        if (state.curQuestion == -1 || state.curQuestion >= amount) return

        setTimeout(() => {
            rf.current!.style.transform = `scaleX(${
                (state.curQuestion + 1) / amount
            })`
        }, 300)
    }, [state.curQuestion])

    if (state.isLoading) return <div className={classes.title}>Loading...</div>

    if (state.isError) {
        return (
            <div className={classes.error}>
                <div className={`${classes.title} ${classes.fail}`}>
                    Something went wrong (
                </div>
                <button
                    type="button"
                    className={classes.btn}
                    onClick={handleQuizEnd}
                >
                    back
                </button>
            </div>
        )
    }

    if (state.curQuestion >= amount) {
        let face: string = ''
        let resultText: string = ''
        const percent: number = Number(
            ((state.result / amount) * 100).toFixed(2)
        )

        if (percent >= 80) {
            face = bestFace
            resultText = 'perfect'
        } else if (percent >= 50) {
            face = goodFace
            resultText = 'good'
        } else {
            face = badFace
            resultText = 'bad'
        }

        return (
            <div className={classes.container}>
                <div className={classes.end_wrap}>
                    <div className={classes.end_icon}>
                        <FaCrown />
                    </div>
                    <p className={classes.top_title}>
                        You've completed the Quiz!
                    </p>
                    <p className={classes.end_count}>
                        <span className={classes.count_left}>
                            and {resultText}
                        </span>
                        <img src={face} alt="emotion" />{' '}
                        <span className={classes.count_right}>
                            You got <span>{state.result}</span> out of{' '}
                            <span>{amount}</span>
                        </span>
                    </p>
                    <button
                        className={`${classes.next_btn} ${classes.btn}`}
                        onClick={handleQuizEnd}
                    >
                        Exit
                    </button>
                </div>
            </div>
        )
    }

    const curQ = state.questions[state.curQuestion]

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <h2 className={classes.top_title}>awesome quiz application</h2>
                <div className={classes.result}>
                    <p className={classes.result_text}>result</p>
                    <p className={classes.result_count}>{state.result}</p>
                </div>
                <div className={classes.progress}>
                    <div className={classes.fill} ref={rf}></div>
                </div>
            </div>

            <div className={classes.questions}>
                <p className={classes.question}>{`${
                    state.curQuestion + 1
                }. ${decodeURIComponent(curQ.questionText)}`}</p>
                <ul className={classes.answers}>
                    {curQ.answers.map((answer, ind) => {
                        let cls: string = ''
                        if (curQ.userAnswer >= 0) {
                            if (ind === curQ.correct) cls = classes.correct
                            if (ind === curQ.userAnswer && curQ.correct !== ind)
                                cls = classes.wrong
                        }
                        return (
                            <li
                                className={`${classes.answer} ${cls}`}
                                key={ind}
                                onClick={() => {
                                    if (curQ.userAnswer >= 0) return
                                    dispatch({
                                        type: 'USER_ANSWER',
                                        payload: ind,
                                    })
                                }}
                            >
                                {decodeURIComponent(answer)}{' '}
                                {cls &&
                                    (cls === classes.correct ? (
                                        <BsCheckCircle />
                                    ) : (
                                        <ImCancelCircle />
                                    ))}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className={classes.bottom}>
                <p className={classes.count}>
                    <span>{state.curQuestion + 1}</span> of{' '}
                    <span>{amount}</span> Questions
                </p>
                {curQ.userAnswer >= 0 && (
                    <button
                        className={`${classes.next_btn} ${classes.btn}`}
                        onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
                    >
                        {state.curQuestion === amount - 1
                            ? 'Finish'
                            : 'next que'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Quiz
