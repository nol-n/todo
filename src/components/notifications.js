let actions = [];

const loadActionsFromLocalStorage = () => {
    const savedActions = JSON.parse(localStorage.getItem('actions'));
    if (savedActions) {
        actions = savedActions;
    }
};

const saveActionsToLocalStorage = () => {
    localStorage.setItem('actions', JSON.stringify(actions));
};

export const addAction = (action) => {
    actions.unshift(action);
    if (actions.length > 5) {
        actions.pop();
    }
    saveActionsToLocalStorage();
    updateNotifications();
};

const updateNotifications = () => {
    const notificationsList = document.querySelector('#notifications-list');
    notificationsList.innerHTML = '';
    actions.forEach(action => {
        const li = document.createElement('li');
        li.textContent = action;
        notificationsList.appendChild(li);
    });
};

export const setupNotifications = () => {
    const notificationsIcon = document.querySelector('.notifications-icon');
    const notificationsDropdown = document.querySelector('#notifications-dropdown');

    notificationsIcon.addEventListener('click', () => {
        if (notificationsDropdown.style.display === 'none' || !notificationsDropdown.style.display) {
            const rect = notificationsIcon.getBoundingClientRect();
            notificationsDropdown.style.top = `${rect.bottom}px`;
            notificationsDropdown.style.left = `${rect.left}px`;
            notificationsDropdown.style.display = 'block';
        } else {
            notificationsDropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!notificationsDropdown.contains(event.target) && event.target !== notificationsIcon) {
            notificationsDropdown.style.display = 'none';
        }
    });
};

loadActionsFromLocalStorage();
updateNotifications();