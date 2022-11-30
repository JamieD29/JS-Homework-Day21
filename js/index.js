var employeeList = new Array();

// Kiểm tra ngày nhập theo đúng format 
function isValidDate(dateString, errorEmp) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
        document.getElementById(errorEmp.errorId).style.display = 'block';
        document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
        return false;
    }
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        document.getElementById(errorEmp.errorId).style.display = 'block';
        document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
        return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    if (day > 0 && day <= monthLength[month - 1]) {
        document.getElementById(errorEmp.errorId).style.display = 'none';
        return true;
    } else {
        document.getElementById(errorEmp.errorId).style.display = 'block';
        document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
        return false;
    }
};


function requiredInput(empValue, errorEmp) {
    if (empValue.length > 0 || empValue > 0) {
        document.getElementById(errorEmp.errorId).style.display = 'none';
        return true;
    }
    document.getElementById(errorEmp.errorId).style.display = 'block';
    document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
    return false;
}

function checkLengthInput(empValue, errorEmp) {
    if (empValue.length < errorEmp.min || empValue.length > errorEmp.max || empValue < errorEmp.min || empValue > errorEmp.max) {
        document.getElementById(errorEmp.errorId).style.display = 'block';
        document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
        return false;
    }
    document.getElementById(errorEmp.errorId).style.display = "none";
    return true;
}

function patternInput(empValue, errorEmp) {
    if (errorEmp.regExp.test(empValue)) {
        document.getElementById(errorEmp.errorId).style.display = "none";
        return true;
    }
    document.getElementById(errorEmp.errorId).style.display = 'block';
    document.getElementById(errorEmp.errorId).innerHTML = `${errorEmp.errorScript}`;
    return false;
}



function validationForm() {
    var empAccount = document.getElementById('tknv').value;
    var empFullName = document.getElementById('name').value;
    var empEmail = document.getElementById('email').value;
    var empPassword = document.getElementById('password').value;
    var empWorkingDay = document.getElementById('datepicker').value;
    var empSalary = +document.getElementById('luongCB').value;
    var empPosition = document.getElementById('chucvu').value;
    var empWorkingTime = +document.getElementById('gioLam').value;


    var empAccountValid =
        requiredInput(empAccount, { errorId: 'tbTKNV', errorScript: '*Nhập tên tài khoản' }) &&
        checkLengthInput(empAccount, { errorId: 'tbTKNV', min: 4, max: 6, errorScript: "*Tài khoản phải từ 4 đến 6 ký tự" });

    var empFullNameVadid =
        requiredInput(empFullName, { errorId: 'tbTen', errorScript: '*Nhập đầy đủ tên của bạn' }) &&
        patternInput(empFullName, { errorId: 'tbTen', errorScript: "*Tên không được chứa kí tự 0-9", regExp: /[A-z\s]+$/g });

    var empEmailValid =
        requiredInput(empEmail, { errorId: 'tbEmail', errorScript: '*Nhập email của bạn' }) &&
        patternInput(empEmail, { errorId: 'tbEmail', errorScript: '*Email chưa đúng dạng, ví dụ: abc@email.com', regExp: /\S+@\S+\.\S+/g });

    var empPasswordValid =
        requiredInput(empPassword, { errorId: 'tbMatKhau', errorScript: '*Nhập mật khẩu' }) &&
        patternInput(empPassword, { errorId: 'tbMatKhau', errorScript: '*Mật khẩu phải từ 6-10 ký tự (ít nhất 1 kí tự số 0-9, 1 kí tự in hoa ABC, 1 ký tự đặc biệt @,/,*,&,...)', regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/g });

    var empWorkingDayValid =
        requiredInput(empWorkingDay, { errorId: 'tbNgay', errorScript: '*Nhập ngày làm của bạn' }) &&
        isValidDate(empWorkingDay, { errorId: 'tbNgay', errorScript: '*Kiểm tra lại giá trị nhập (MM/DD/YYYY)' });

    var empSalaryValid =
        requiredInput(empSalary, { errorId: 'tbLuongCB', errorScript: '*Nhập lương cơ bản của bạn' }) &&
        checkLengthInput(empSalary, { errorId: 'tbLuongCB', min: 1000000, max: 20000000, errorScript: "*Lương cơ bản chỉ từ 1.000.000 - 20.000.000 VNĐ" });

    var empPositionValid =
        requiredInput(empPosition, { errorId: 'tbChucVu', errorScript: '*Chọn chức vụ của bạn' });

    var empWorkingTimeValid =
        requiredInput(empWorkingTime, { errorId: 'tbGiolam', errorScript: '*Nhập số giờ bạn đã làm' }) &&
        checkLengthInput(empWorkingTime, { errorId: 'tbGiolam', min: 80, max: 200, errorScript: "*Giờ làm phải từ 80 - 200 giờ" });

    var isFormValid = empAccountValid && empFullNameVadid && empEmailValid && empPasswordValid && empWorkingDayValid && empSalaryValid && empPositionValid & empWorkingTimeValid;

    return isFormValid;
}


function createEmployee() {



    if (!validationForm()) return;

    var empAccount = document.getElementById('tknv').value;
    var empFullName = document.getElementById('name').value;
    var empEmail = document.getElementById('email').value;
    var empPassword = document.getElementById('password').value;
    var empWorkingDay = document.getElementById('datepicker').value;
    var empSalary = +document.getElementById('luongCB').value;
    var empPosition = document.getElementById('chucvu').value;
    var empWorkingTime = +document.getElementById('gioLam').value;

    //--------------Kiểm tra dữ liệu nhập-----------------//

    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i]._account === empAccount) {

            document.getElementById("tbTKNV").style.display = 'block';
            document.getElementById("tbTKNV").innerHTML = 'Tên tài khoản này đã tồn tại';
            return;
        }
        if (employeeList[i]._email === empEmail) {

            document.getElementById("tbEmail").style.display = 'block';
            document.getElementById("tbEmail").innerHTML = 'Tài khoản Email này đã được sử dụng';
            return;
        }
    }


    // Khởi tạo nhân viên
    var _employee = new Employee(empAccount, empFullName, empEmail,
        empPassword, empWorkingDay, empSalary, empPosition, empWorkingTime);
    //Thêm nhân viên vào danh sách
    employeeList.push(_employee);

    renderEmployee();
    saveEmployeeList();

    alert('Tạo nhân viên mới thành công !!!');
    document.getElementById('employeeForm').reset();
};



document.getElementById('btnThemNV').onclick = createEmployee;


function renderEmployee(data) {

    data = data || employeeList;

    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `
        <tr>
        <td>${data[i]._account}</td>
        <td>${data[i]._fullname}</td>
        <td>${data[i]._email}</td>
        <td>${data[i]._workingDay}</td>
        <td>${data[i]._position}</td>
        <td>${data[i].calcSalary()}</td>
        <td>${data[i].Classification()}</td>
        <td style="display: flex;"> 
        <button class="btn btn-info  " data-toggle="modal" data-target="#myModal" onclick="editEmployee('${data[i]._account}')">Edit</button>
        <button class="btn btn-outline-danger ml-2 " onclick="deleteEmployee('${data[i]._account}')">Delete</button>
                
        </td>
        </tr>`

    }
    document.getElementById('tableDanhSach').innerHTML = html;
}


function saveEmployeeList() {
    var employeeListJson = JSON.stringify(employeeList);
    localStorage.setItem("Emp", employeeListJson);
}

function getEmployeeList() {
    var employeeListJson = localStorage.getItem("Emp");

    if (!employeeListJson) {
        return [];
    }

    return JSON.parse(employeeListJson);
}

function mapEmployeeList(local) {
    var result = new Array();
    for (var i = 0; i < local.length; i++) {
        var oldEmployee = local[i];
        var copyEmployee = new Employee(
            oldEmployee._account,
            oldEmployee._fullname,
            oldEmployee._email,
            oldEmployee._password,
            oldEmployee._workingDay,
            oldEmployee._salary,
            oldEmployee._position,
            oldEmployee._workingTime);

        result.push(copyEmployee);
    }

    return result;
}

document.getElementById('btnThem').onclick = function () {
    var titleEdit = document.getElementById('header-title');
    titleEdit.innerHTML = "Log In";

    var hiddenUpdateBtn = document.getElementById('btnCapNhat');
    hiddenUpdateBtn.style.display = 'none';

    var hiddenAddBtn = document.getElementById('btnThemNV');
    hiddenAddBtn.style.display = 'block';
    document.getElementById('tknv').disabled = false;
    document.getElementById('employeeForm').reset();
}


function findByAccountName(accountName) {
    var index = -1;
    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i]._account === accountName) {
            return index = i;
        }
    }
    return index;
}

function deleteEmployee(accountName) {
    var index = findByAccountName(accountName);
    if (index === -1) {
        alert("Nhân viên này KHÔNG tồn tại!!");
        return;
    }
    if (confirm("Bạn có chắc muốn xoá nhân viên với tài khoản " + accountName + " này không?")) {
        employeeList.splice(index, 1);
        renderEmployee();
        saveEmployeeList();
        alert("Xoá nhân viên với tài khoản " + accountName + "thành công !!");
    } else {

        return;
    }
}


/**
 * Hàm để khi nhấn Edit chắc chắn các thông báo lỗi còn xuất hiện ở form được ẩn đi hết
 * 
 *  Ví dụ: khi bấm THÊM NHÂN VIÊN nhưng ta không nhập dữ liệu và bấm THÊM, các thanh 
 * input sẽ báo lỗi và lỗi sẽ còn ở đó.
 *      => Vì thế hàm này để xoá sạch các thông báo đó để EDIT thông tin nhân viên.
 */
function resetErrorForm() {
    document.getElementById('tbTKNV').style.display = 'none';
    document.getElementById('tbTen').style.display = 'none';
    document.getElementById('tbEmail').style.display = 'none';
    document.getElementById('tbMatKhau').style.display = 'none';
    document.getElementById('tbNgay').style.display = 'none';
    document.getElementById('tbLuongCB').style.display = 'none';
    document.getElementById('tbChucVu').style.display = 'none';
    document.getElementById('tbGiolam').style.display = 'none';
}


function editEmployee(accountName) {
    resetErrorForm()

    var titleEdit = document.getElementById('header-title');
    titleEdit.innerHTML = "Edit Employee's Information";

    var hiddenUpdateBtn = document.getElementById('btnCapNhat');
    hiddenUpdateBtn.style.display = 'block';

    var hiddenAddBtn = document.getElementById('btnThemNV');
    hiddenAddBtn.style.display = 'none';

    var index = findByAccountName(accountName);
    if (index === -1) return alert("Nhân viên này KHÔNG tồn tại!!");

    var employee = employeeList[index];
    document.getElementById('tknv').value = employee._account;
    document.getElementById('name').value = employee._fullname;
    document.getElementById('email').value = employee._email;
    document.getElementById('password').value = employee._password;
    document.getElementById('datepicker').value = employee._workingDay;
    document.getElementById('luongCB').value = employee._salary;
    document.getElementById('chucvu').value = employee._position;
    document.getElementById('gioLam').value = employee._workingTime;


    document.getElementById('tknv').disabled = true;


}

document.getElementById('btnCapNhat').onclick = function () {

    var employeeUpdateAccount = document.getElementById('tknv').value;

    var indexUpdated = findByAccountName(employeeUpdateAccount);
    if (indexUpdated === -1) {
        alert("Nhân viên này KHÔNG tồn tại!!");
        return;
    }
    var updateEmployee = employeeList[indexUpdated];

    var empFullName = document.getElementById('name');
    var empEmail = document.getElementById('email');
    var empPassword = document.getElementById('password');
    var empWorkingDay = document.getElementById('datepicker');
    var empSalary = document.getElementById('luongCB');
    var empPosition = document.getElementById('chucvu');
    var empWorkingTime = document.getElementById('gioLam');

    var btnUpdate = document.getElementById('btnCapNhat');
    btnUpdate.removeAttribute('data-dismiss');
    if (confirm("Bạn có đồng thay đổi thông tin của nhân viên với tài khoản " + employeeUpdateAccount + " này không ?")) {
        if (!validationForm()) return;

        updateEmployee._fullname = empFullName.value;

        for (var i = 0; i < employeeList.length; i++) {

            if (employeeList[i]._email === empEmail.value && employeeList[i] !== updateEmployee) {
                document.getElementById("tbEmail").style.display = 'block';
                document.getElementById("tbEmail").innerHTML = 'Tài khoản Email này đã được sử dụng';
                return;
            }

        }
        updateEmployee._email = empEmail.value;
        updateEmployee._password = empPassword.value;
        updateEmployee._workingDay = empWorkingDay.value;
        updateEmployee._salary = Number(empSalary.value);
        updateEmployee._position = empPosition.value;
        updateEmployee._workingTime = Number(empWorkingTime.value);

        console.log(updateEmployee._email);


        renderEmployee();

        saveEmployeeList();

        alert("Cập nhật thông tin mới thành công !!!");

        btnUpdate.setAttribute('data-dismiss', 'modal');

    }
    else {
        return;
    }
}




function searchEmployee(e) {
    var keyword = e.target.value.toLowerCase().trim();
    var results = new Array();

    for (var i = 0; i < employeeList.length; i++) {
        if (employeeList[i].Classification().toLowerCase().includes(keyword)) {
            results.push(employeeList[i]);
        }
    }

    renderEmployee(results);
}



window.onload = function () {

    var employeeListFromLocal = getEmployeeList();

    employeeList = mapEmployeeList(employeeListFromLocal);

    renderEmployee();

};

