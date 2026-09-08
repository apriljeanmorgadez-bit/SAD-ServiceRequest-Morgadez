let currentUser = null;
let requests = [];


async function checkUser() {

    const { data, error } =
        await supabaseClient.auth.getUser();

    if (error || !data.user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = data.user;

    loadRequests();
}

async function loadRequests() {

    const { data, error } =
        await supabaseClient
            .from("service_requests")
            .select("*")
            .order("id", { ascending: true });

    if (error) {

        console.error(error);

        showMessage(
            "Error loading requests: " + error.message
        );

        return;
    }

    requests = data;

    displayRequests(requests);

    updateDashboard(requests);
}


function displayRequests(data) {

    const table =
        document.getElementById("requestTable");

    table.innerHTML = "";

    data.forEach(request => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${request.id}</td>

            <td>${escapeHTML(request.requester_name)}</td>

            <td>${escapeHTML(request.department)}</td>

            <td>${escapeHTML(request.category)}</td>

            <td>${escapeHTML(request.priority)}</td>

            <td>${escapeHTML(request.status)}</td>

            <td>
                ${new Date(request.created_at)
                    .toLocaleDateString()}
            </td>

            <td>

                <button
                    onclick="editRequest(${request.id})"
                >
                    Edit
                </button>

                <button
                    onclick="deleteRequest(${request.id})"
                >
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);

    });
}


document
    .getElementById("requestForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("requestId").value;

        const requester =
            document.getElementById("requester").value.trim();

        const department =
            document.getElementById("department").value.trim();

        const category =
            document.getElementById("category").value;

        const description =
            document.getElementById("description").value.trim();

        const priority =
            document.getElementById("priority").value;

        const status =
            document.getElementById("status").value;


        // VALIDATION

        if (!requester) {

            alert("Requester name is required.");
            return;

        }

        if (!department) {

            alert("Department is required.");
            return;

        }

        if (!category) {

            alert("Please select a category.");
            return;

        }

        if (description.length < 5) {

            alert("Please provide a sufficient description.");
            return;

        }

        if (!["Low", "Medium", "High"].includes(priority)) {

            alert("Invalid priority.");
            return;

        }


        // UPDATE

        if (id) {

            const { error } =
                await supabaseClient
                    .from("service_requests")
                    .update({

                        requester_name: requester,
                        department: department,
                        category: category,
                        description: description,
                        priority: priority,
                        status: status

                    })
                    .eq("id", id)
                    .eq("user_id", currentUser.id);


            if (error) {

                alert(
                    "Update failed: " +
                    error.message
                );

                return;

            }

            showMessage("Request updated successfully.");

        }


        // CREATE

        else {

            const { error } =
                await supabaseClient
                    .from("service_requests")
                    .insert({

                        requester_name: requester,
                        department: department,
                        category: category,
                        description: description,
                        priority: priority,
                        status: "Pending",
                        user_id: currentUser.id

                    });


            if (error) {

                alert(
                    "Create failed: " +
                    error.message
                );

                return;

            }

            showMessage("Request created successfully.");

        }


        resetForm();

        loadRequests();

    });

// EDIT

function editRequest(id) {

    const request =
        requests.find(item => item.id === id);

    if (!request) return;


    document.getElementById("requestId").value =
        request.id;

    document.getElementById("requester").value =
        request.requester_name;

    document.getElementById("department").value =
        request.department;

    document.getElementById("category").value =
        request.category;

    document.getElementById("description").value =
        request.description;

    document.getElementById("priority").value =
        request.priority;

    document.getElementById("status").value =
        request.status;


    document.getElementById("formTitle").textContent =
        "Edit Service Request";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// DELETE


async function deleteRequest(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this request?"
        );

    if (!confirmed) return;


    const { error } =
        await supabaseClient
            .from("service_requests")
            .delete()
            .eq("id", id)
            .eq("user_id", currentUser.id);


    if (error) {

        alert(
            "Delete failed: " +
            error.message
        );

        return;

    }

    showMessage("Request deleted successfully.");

    loadRequests();

}


// DASHBOARD


function updateDashboard(data) {

    const total = data.length;

    const pending =
        data.filter(
            r => r.status === "Pending"
        ).length;

    const progress =
        data.filter(
            r => r.status === "In Progress"
        ).length;

    const completed =
        data.filter(
            r => r.status === "Completed"
        ).length;


    document.getElementById("totalRequests")
        .textContent = total;

    document.getElementById("pendingRequests")
        .textContent = pending;

    document.getElementById("progressRequests")
        .textContent = progress;

    document.getElementById("completedRequests")
        .textContent = completed;

}


// SEARCH + FILTER


function applyFilters() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const status =
        document
            .getElementById("statusFilter")
            .value;

    const priority =
        document
            .getElementById("priorityFilter")
            .value;


    const filtered =
        requests.filter(request => {

            const searchMatch =
                request.requester_name
                    .toLowerCase()
                    .includes(search)

                ||

                request.description
                    .toLowerCase()
                    .includes(search);


            const statusMatch =
                status === "All" ||
                request.status === status;


            const priorityMatch =
                priority === "All" ||
                request.priority === priority;


            return (
                searchMatch &&
                statusMatch &&
                priorityMatch
            );

        });


    displayRequests(filtered);

}


document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        applyFilters
    );


document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        applyFilters
    );


document
    .getElementById("priorityFilter")
    .addEventListener(
        "change",
        applyFilters
    );


// LOGOUT

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        async function() {

            await supabaseClient.auth.signOut();

            window.location.href =
                "login.html";

        }
    );


// CANCEL EDIT


document
    .getElementById("cancelEdit")
    .addEventListener(
        "click",
        resetForm
    );


function resetForm() {

    document
        .getElementById("requestForm")
        .reset();

    document
        .getElementById("requestId")
        .value = "";

    document
        .getElementById("status")
        .value = "Pending";

    document
        .getElementById("formTitle")
        .textContent =
            "New Service Request";

}


// MESSAGE


function showMessage(message) {

    const element =
        document.getElementById("message");

    element.textContent = message;

    setTimeout(() => {

        element.textContent = "";

    }, 3000);

}

// BASIC HTML ESCAPE

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// START APPLICATION

checkUser();
