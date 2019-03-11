import features from "../libs/features";
import {getUserInfo} from '../libs/api';

const init = async () => {
    const allUsers = document.querySelectorAll('a.hnuser');
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    for (const user of allUsers) {
        const userInfo = await getUserInfo(user.innerText.split(' ')[0]);
        const userDiv = document.createElement('div');
        
        const userDate = new Date(userInfo.created * 1000);
        const month = userDate.getMonth();
        const date = userDate.getDate();
        const year = userDate.getFullYear();
        const renderedDate = `${monthNames[month]} ${date}, ${year}`;
        const url = `front?day=${year}-${month}-${date}&birth=${userInfo.id}`;
        
        const table = `
            <table>
                <tbody>
                    <tr>
                        <td>user:</td>
                        <td>${userInfo.id}</td>
                    </tr>
                    <tr>
                        <td>created:</td>
                        <td>
                            <a href="${url}">${renderedDate}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>karma:</td>
                        <td>${userInfo.karma}</td>
                    </tr>
                    ${userInfo.about ? '<tr><td>about:</td><td>'+userInfo.about+'</td></tr>' : ''}
                </tbody>
            </table>
        `;
        userDiv.innerHTML = table;
        userDiv.classList.add('__rhn__hover-user-info', '__rhn__no-display');
        userDiv.style.left = user.getBoundingClientRect().left + 'px';

        user.parentElement.appendChild(userDiv);
    }
};

features.add({
    id: 'show-user-info-on-hover.js',
    pages: ['*'],
    init: init
});

export default init;