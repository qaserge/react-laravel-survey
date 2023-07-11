import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    setCurrentUser: () => { },
    setUserToken: () => { }
});

const tmpSurveys = [
    {
        "id": 1,
        "image_url": "https://loremflickr.com/320/240?random=1",
        "title": "title1",
        "slug": "slug1",
        "status": true,
        "description": "description1",
        "created_at": "2023-06-25 13:25:41",
        "updated_at": "2023-06-25 13:25:42",
        "expire_date": "2023-07-25",
        "questions": [
            {
                "id": 15,
                "type": "checkbox",
                "question": "question1",
                "description": "description1",
                "data": {
                    "options": [
                        {
                            "uuid": "111",
                            "text": "text1"
                        },
                        {
                            "uuid": "222",
                            "text": "text2"
                        }
                    ]
                }
            },
            {
                "id": 16,
                "type": "text",
                "question": "question_text1",
                "description": null
            }
        ],        
    },
    {
        "id": 2,
        "image_url": "https://loremflickr.com/320/240?random=2",
        "title": "title2",
        "slug": "slug2",
        "status": false,
        "description": "description2",
        "created_at": "2023-06-26 10:15:22",
        "updated_at": "2023-06-26 10:15:23",
        "expire_date": "2023-07-26",
        "questions": [
            {
                "id": 17,
                "type": "radio",
                "question": "question2",
                "description": "description2",
                "data": {
                    "options": [
                        {
                            "uuid": "333",
                            "text": "text3"
                        },
                        {
                            "uuid": "444",
                            "text": "text4"
                        }
                    ]
                }
            },
            {
                "id": 18,
                "type": "text",
                "question": "question_text2",
                "description": null
            }
        ]
    },
    {
        "id": 3,
        "image_url": "https://loremflickr.com/320/240?random=3",
        "title": "title3",
        "slug": "slug3",
        "status": true,
        "description": "description3",
        "created_at": "2023-06-27 15:45:12",
        "updated_at": "2023-06-27 15:45:13",
        "expire_date": "2023-07-27",
        "questions": [
            {
                "id": 19,
                "type": "checkbox",
                "question": "question3",
                "description": "description3",
                "data": {
                    "options": [
                        {
                            "uuid": "555",
                            "text": "text5"
                        },
                        {
                            "uuid": "666",
                            "text": "text6"
                        }
                    ]
                }
            },
            {
                "id": 20,
                "type": "text",
                "question": "question_text3",
                "description": null
            }
        ]
    }
];


export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [surveys, setSurveys] = useState(tmpSurveys);

    const setUserToken = (token) => {
        if (token) {
          localStorage.setItem('TOKEN', token)
        } else {
          localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
      }

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                surveys
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)