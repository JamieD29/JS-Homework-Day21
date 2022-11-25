function Employee (account, fullname, email, password, workingDay, salary, position, workingTime ){
    this._account = account ;
    this._fullname = fullname;
    this._email = email;
    this._password = password; 
    this._workingDay = workingDay; 
    this._salary = salary; 
    this._position = position;
    this._workingTime = workingTime;
    this.calcSalary = function(){
        if(this._position === "Sếp"){
            return this._salary *3;
        }else if(this._position === "Trưởng phòng"){
            return this._salary * 2;
        }else {
            return this._salary;
        }
    
    }

    this.Classification = function (){
        if(this._workingTime >= 192){
            return "Nhân viên xuất sắc";
        }else if(this._workingTime >= 176 && this._workingTime < 192){
            return "Nhân viên giỏi";
        }else if(this._workingTime >= 160 && this._workingTime < 176 ){
            return "Nhân viên khá";
        }else {
            return "Nhân viên trung bình";
        }

    }

}