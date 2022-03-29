!(function () {
    const form = document.getElementById("__login_form");
    const formError = document.getElementById("__login_error");
    // const log = document.getElementById("__input_log");
    const inputEmail = document.querySelector("input[name='email']");
    const inputPassword = document.querySelector("input[name='password']");

    let value = {
        email: "",
        password: ""
    };

    inputEmail.addEventListener("change", (e) => {
        value = { ...value, email: e.target.value };
        // log.textContent = JSON.stringify(value, null, 2);
    });
    inputPassword.addEventListener("change", (e) => {
        value = { ...value, password: e.target.value };
        // log.textContent = JSON.stringify(value, null, 2);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!value.email || !value.password) return;

        fetch("/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.success) {
                    const errorMessage = res.data[0].message;
                    formError.textContent = errorMessage;
                } else {
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    });
})();
