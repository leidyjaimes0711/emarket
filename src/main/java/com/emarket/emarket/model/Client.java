package com.emarket.emarket.model;

public class Client {

    private Integer id;
    private String name;
    private String lastName;
    private String identificationNumber;

    private String email;
    private String cellphoneNumber;

//constructores
    public Client(Integer id, String name, String lastName, String identificationNumber, String email, String cellphoneNumber) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.email = email;
        this.cellphoneNumber = cellphoneNumber;
    }

    public Client(String name, String lastName, String identificationNumber, String email, String cellphoneNumber) {
        this.name = name;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.email = email;
        this.cellphoneNumber = cellphoneNumber;
    }



    //setters y getters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellphoneNumber() {
        return cellphoneNumber;
    }

    public void setCellphoneNumber(String cellphoneNumber) {
        this.cellphoneNumber = cellphoneNumber;
    }
}
