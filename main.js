(function() {

    var friends = ["Pooja", "Poonam", "monika", "Manisha", "soni", "shital", "shemaroo", "komti", "bilar", "gargi", "gomti", "fruity"];

    function showForm(friendIndex) {
        document.getElementById('main-panel').style.display = "block";
        const saveBtn = document.getElementById('savedata');
        const updateBtn = document.getElementById('updatedata');

        const nameElement = document.getElementById("name");
    
        if (friendIndex) {
            nameElement.value = friends[friendIndex];
            updateBtn.style.display = 'block';
            updateBtn.dataset.friendIndex = friendIndex;
            saveBtn.style.display = 'none';
        } else {
            nameElement.value = '';
            updateBtn.style.display = 'none';
            saveBtn.style.display = 'block';
        }
    }

    function hideForm() {
        document.getElementById('main-panel').style.display = "none";
    }

    function cleanFriendsContainer() {
        const friendContainer = document.getElementById("friendList");
        var child = friendContainer.lastElementChild;  
        while (child) { 
            friendContainer.removeChild(child); 
            child = friendContainer.lastElementChild;
        }
        friendContainer.innerHTML = '';
    }

    const submitFriendName = (event) => {
        event.preventDefault();
        const nameElement = document.getElementById("name");
        if (nameElement.value && friends.indexOf(nameElement.value) == -1) {
            friends.push(nameElement.value);
            initFriendsList(friends);  
        }
        nameElement.value = '';
        hideForm();
    }

    const updateFriendName = (event) => {
        const updateBtn = document.getElementById('updatedata');
        const friendIndex = event.target.dataset.friendIndex;
        const nameElement = document.getElementById("name");

        
        if (nameElement.value && friends.indexOf(nameElement.value) == -1) {
            friends[friendIndex] = nameElement.value;
            initFriendsList(friends);
            hideForm();
        }
    }

    const deleteFriendName = function(event) {
        event.preventDefault();

        const friendIndex = event.target.dataset.friendIndex;
        friends.splice(friendIndex, 1);
        initFriendsList(friends);
    }

    function getDeleteBtn(index) {
        var delButton = document.createElement('button');
        delButton.classList.add('btn');
        delButton.classList.add('deleteBtn');
        delButton.dataset.friendIndex = index;

        delButton.innerHTML = 'Delete';
        delButton.addEventListener('click', deleteFriendName);
    
        return delButton;
    }

    function editFriendName(event) {
        showForm(event.target.dataset.friendIndex);
    }

    function getEditBtn(index) {
        var editButton = document.createElement('button');
        editButton.classList.add('btn');
        editButton.classList.add('editBtn');
        editButton.dataset.friendIndex = index;

        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', editFriendName);
    
        return editButton;
    }

    function addFriendsListItem(friendContainer, index) {
        var li = document.createElement('li');
        li.innerText = friends[index];
        li.classList.add('list-item');
    
        li.appendChild(getEditBtn(index));
        li.appendChild(getDeleteBtn(index));

        friendContainer.appendChild(li);
    }

    function initFriendsList(friends) {
        const friendContainer = document.getElementById("friendList");
        cleanFriendsContainer();

        for (i = 0; i < friends.length; i++) {
            addFriendsListItem(friendContainer, i)
        }
    }

    function initApp() {
        const formbtn = document.getElementById('addBtn');
        const closeBtn = document.getElementById('closeForm');
    
        const friendForm = document.getElementById("friend-form");
        
        formbtn.addEventListener('click', () => showForm());
        closeBtn.addEventListener('click', hideForm);

        friendForm.addEventListener("submit", submitFriendName);
        const updateBtn = document.getElementById('updatedata');

        updateBtn.addEventListener('click', updateFriendName);
    
        initFriendsList(friends);
    }

    initApp();
})();