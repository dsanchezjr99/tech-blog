async function deleteFormHandler(event) {
    const post = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
}
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler); 