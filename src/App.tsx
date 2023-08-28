import { useState } from 'react'
import classes from './App.module.css'
import Quiz from './Quiz'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import hero from './assets/hero.jpg'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 800,
            lg: 1200,
            xl: 1440,
        },
    },
})

export interface Settings {
    isQuiz: boolean
    amount: number
    category: number
    difficulty: 'easy' | 'medium' | 'hard'
}

const initState: Settings = {
    isQuiz: false,
    amount: 5,
    category: 9,
    difficulty: 'easy',
}

function App() {
    const [quizSettings, setQuizSettings] = useState<Settings>(initState)

    function handleChange(e: SelectChangeEvent) {
        const name = e.target.name as keyof Omit<Settings, 'isQuiz'>
        const s: Settings = { ...quizSettings }

        if (name === 'amount' || name === 'category') {
            s[name] = parseInt(e.target.value)
        } else {
            s[name] = e.target.value as Settings['difficulty']
        }

        setQuizSettings(s)
    }

    return (
        <ThemeProvider theme={theme}>
            <div
                className={classes.wrapper}
                style={{ backgroundImage: `url('${hero}')` }}
            >
                {quizSettings.isQuiz ? (
                    <Quiz
                        {...(Object.fromEntries(
                            Object.entries(quizSettings).filter(
                                (pair) => pair[0] != 'isQuiz'
                            )
                        ) as Omit<Settings, 'isQuiz'>)}
                        handleQuizEnd={() =>
                            setQuizSettings({ ...quizSettings, isQuiz: false })
                        }
                    />
                ) : (
                    <div className={classes.settings}>
                        <FormControl
                            fullWidth
                            sx={{ marginBottom: 7, textAlign: 'left' }}
                        >
                            <FormHelperText
                                sx={{
                                    color: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '23px',
                                    },
                                    marginBottom: 1,
                                    mx: 0,
                                }}
                            >
                                Number of Questions:
                            </FormHelperText>
                            <Select
                                value={quizSettings.amount.toString()}
                                onChange={handleChange}
                                inputProps={{ name: 'amount' }}
                                sx={{
                                    backgroundColor: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '25px',
                                    },
                                    borderRadius: 1.5,
                                }}
                            >
                                <MenuItem
                                    value={'5'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    5
                                </MenuItem>
                                <MenuItem
                                    value={'10'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    10
                                </MenuItem>
                                <MenuItem
                                    value={'20'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    20
                                </MenuItem>
                                <MenuItem
                                    value={'50'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    50
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ marginBottom: 7, textAlign: 'left' }}
                        >
                            <FormHelperText
                                sx={{
                                    color: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '23px',
                                    },
                                    marginBottom: 1,
                                    mx: 0,
                                }}
                            >
                                Select Category:
                            </FormHelperText>
                            <Select
                                value={quizSettings.category.toString()}
                                onChange={handleChange}
                                inputProps={{ name: 'category' }}
                                sx={{
                                    backgroundColor: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '25px',
                                    },
                                    borderRadius: 1.5,
                                    marinBttom: 3,
                                }}
                            >
                                <MenuItem
                                    value={'9'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    General Knowledge
                                </MenuItem>
                                <MenuItem
                                    value={'17'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Science {'&'} Nature
                                </MenuItem>
                                <MenuItem
                                    value={'18'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Science: Computers
                                </MenuItem>
                                <MenuItem
                                    value={'10'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Books
                                </MenuItem>
                                <MenuItem
                                    value={'11'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Film
                                </MenuItem>
                                <MenuItem
                                    value={'15'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Video Games
                                </MenuItem>
                                <MenuItem
                                    value={'24'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Politics
                                </MenuItem>
                                <MenuItem
                                    value={'23'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    History
                                </MenuItem>
                                <MenuItem
                                    value={'22'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Geography
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ marginBottom: 7, textAlign: 'left' }}
                        >
                            <FormHelperText
                                sx={{
                                    color: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '23px',
                                    },
                                    marginBottom: 1,
                                    mx: 0,
                                }}
                            >
                                Select Difficulty:
                            </FormHelperText>
                            <Select
                                value={quizSettings.difficulty.toString()}
                                onChange={handleChange}
                                inputProps={{ name: 'difficulty' }}
                                sx={{
                                    backgroundColor: '#fff',
                                    fontSize: {
                                        xs: '19px',
                                        sm: '25px',
                                    },
                                    borderRadius: 1.5,
                                    marinBttom: 3,
                                }}
                            >
                                <MenuItem
                                    value={'easy'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Easy
                                </MenuItem>
                                <MenuItem
                                    value={'medium'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Medium
                                </MenuItem>
                                <MenuItem
                                    value={'hard'}
                                    sx={{
                                        fontSize: {
                                            xs: '19px',
                                            sm: '25px',
                                        },
                                    }}
                                >
                                    Hard
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <button
                            className={classes.btn}
                            onClick={() =>
                                setQuizSettings({
                                    ...quizSettings,
                                    isQuiz: true,
                                })
                            }
                            type="button"
                        >
                            Start Quiz
                        </button>
                    </div>
                )}
            </div>
        </ThemeProvider>
    )
}

export default App
