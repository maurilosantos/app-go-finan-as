function saveTransaction() {
    showLoading();

    const transaction = createTransaction();

    firebase.firestore()
    .collection('transactions')
    .add(transaction)
    .then(() => {
        hideLoading();
        window.location.href = "../home/home.html";
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao salvar transação');
    })
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}

function logout(){
    firebase.auth().signOut().then(()=> {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("Erro ao fazer logout");
    })
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";
    toggleSaveButtonDisable();
}

function onChangeValue(){
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";

    form.valuePositive().style.display = value <= 0 ? "block" : "none";
    toggleSaveButtonDisable();
}

function onChangeTransactionType() {
    const transactionType = form.transactionType().value;
    form.transactionTypeRequiredError().style.display = !transactionType ? "block" : "none";
    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable(){
    form.saveButton().disabled = !isFormValid();
}

function isFormValid(){
    const date = form.date().value;
    if (!date) {
        return false;
    }
    const value = form.value().value;
    if (!value || value <=0) {
        return false;
    }
    const transactionType = form.transactionType().value;
    if (!transactionType){
        return false;
    }
    return true;
}


const form = {
    currency: () => document.getElementById('currency'),
    date: () => document.getElementById('date'),
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    saveButton: () => document.getElementById('save-button'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    typeExpense: () => document.getElementById('expense'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valuePositive: () => document.getElementById('value-positive-error'),
}