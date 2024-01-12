import React, { useState } from 'react';
import Game from './game';


const Board = () => {
    const player_one = "X";
    const player_two = "O";

    const [initialValue, setValue] = useState(Array(9).fill(null));
    const [x, setX] = useState(true);
    const [name, setNames] = useState({
        Xname: "X",
        Oname: "O",
    });
    const [player, changePlayer] = useState({
        player1: true,
        playerTurn: name.Xname,
        winner: "No",
    });
    const XThename = () => {
        let secname = document.getElementById("Xname").value;
        if (secname !== null && secname !== "") {
            setNames({
                Oname: name.Oname,
                Xname: secname,
            });
            setX({
                x: false,
            });
        }
        gameReset();
    };
    const OThename = () => {
        let onename = document.getElementById("Oname").value;
        if (onename !== null && onename !== "") {
            setNames({
                Xname: name.Xname,
                Oname: onename,
            });
        }
        gameReset();
    };

    const [score, setScore] = useState({
        playX: 0,
        playO: 0,
    });

    const gameReset = () => {
        setValue(Array(9).fill(null));
        changePlayer({
            player1: true,
            playerTurn: name.Xname,
            winner: "No",
        });
        setX({
            x: true,
        });
    };

    const gamePlay = (index) => {
        if (initialValue[index] === null) {
            const newValue = [...initialValue];
            newValue[index] = player.player1 ? player_one : player_two;
            setValue(newValue);

            changePlayer((prevPlayer) => ({
                ...prevPlayer,
                playerTurn: player.player1 ? name.Oname : name.Xname,
                player1: !prevPlayer.player1,
            }));

            const checkWinner = (values) => {
                return (
                    (values[0] !== null &&
                        values[0] === values[1] &&
                        values[0] === values[2]) ||
                    (values[0] !== null &&
                        values[0] === values[3] &&
                        values[0] === values[6]) ||
                    (values[0] !== null &&
                        values[0] === values[4] &&
                        values[0] === values[8]) ||
                    (values[1] !== null &&
                        values[1] === values[4] &&
                        values[1] === values[7]) ||
                    (values[2] !== null &&
                        values[2] === values[5] &&
                        values[2] === values[8]) ||
                    (values[2] !== null &&
                        values[2] === values[4] &&
                        values[2] === values[6]) ||
                    (values[3] !== null &&
                        values[3] === values[4] &&
                        values[3] === values[5]) ||
                    (values[6] !== null &&
                        values[6] === values[7] &&
                        values[6] === values[8])
                );
            };

            if (checkWinner(newValue)) {
                changePlayer({
                    ...player,
                    winner: "Yes",
                });
                if (player.playerTurn === name.Xname) {
                    setScore({
                        ...score,
                        playX: score.playX + 1,
                    });
                } else {
                    setScore({
                        ...score,
                        playO: score.playO + 1,
                    });
                }
            }
        }
    };

    return (
        <div>
            <h1><center>Tic Tac Toe</center></h1>


            <div className='changeFlex flex justify-center items-center h-screen'>
                <div className='gameArea p-8 bg-gray-100 text-center'>
                    <div className='mb-4 text-2xl font-bold text-blue-500 transition duration-300'>
                        Player Turn: {x === false ? name.Xname : player.playerTurn}
                    </div>
                    <div className=''>
                        <div className='grid grid-cols-3 gap-2 mb-4'>
                            {Array.from({ length: 9 }).map((_, index) => (
                                <Game
                                    className={`w-16 h-16 flex items-center justify-center text-3xl font-bold border border-gray-300 cursor-pointer transition duration-300 ${initialValue[index] === player_one ? 'text-green-500' : 'text-blue-500'
                                        } box`}
                                    winner={player.winner}
                                    key={index}
                                    onClick={() => {
                                        gamePlay(index);
                                    }}
                                >
                                    {initialValue[index]}
                                </Game>
                            ))}
                        </div>

                        {player.winner === "Yes" && (
                            <div
                                id='winnerAnnouncement'
                                className=''
                            >
                                Congratulations {player.playerTurn}! You are the winner.
                            </div>
                        )}
                    </div>
                    <button
                        className='mt-4 px-4 py-2 bg-gray-500 text-white rounded cursor-pointer transition duration-300 hover:bg-gray-700'
                        onClick={gameReset}
                    >
                        Reset Game
                    </button>
                </div>

                <div className='toosmall'>
                    <div className='mb-8'>
                        <table className='border-collapse border border-gray-300 w-40'>
                            <thead>
                                <th className='p-2 text-lg font-bold bg-gray-200'>{name.Xname}</th>
                                <th className='p-2 text-lg font-bold bg-gray-200'>{name.Oname}</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-2 bg-green-100'>{score.playX}</td>
                                    <td className='p-2 bg-blue-100'>{score.playO}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-4'>

                        <div className='flex items-center'>
                            <span className='mr-2 text-lg font-bold text-green-500 block'>Enter Name for X:</span>
                            <input
                                id='Xname'
                                type='text'
                                className='border border-green-500 p-2 focus:outline-none focus:ring focus:border-green-300 transition duration-300 rounded-lg tagwidth block11'
                            />
                            <button
                                className='px-4 py-2 ml-2 bg-green-500 text-white rounded cursor-pointer transition duration-300 hover:bg-green-700 ttnwidth block11'
                                onClick={XThename}
                            >
                                Set
                            </button>
                        </div>
                        <div className='mt-2 flex items-center'>
                            <span className='mr-2 text-lg font-bold text-blue-500 block'>Enter Name for O:</span>
                            <input
                                id='Oname'
                                type='text'
                                className='border border-blue-500 p-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 rounded-lg tagwidth'
                            />
                            <button
                                className='px-4 py-2 ml-2 bg-blue-500 text-white rounded cursor-pointer transition duration-300 hover:bg-blue-700 ttnwidth'
                                onClick={OThename}
                            >
                                Set
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            </div>
            );
};

            export default Board;
