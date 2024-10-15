package com.dh.emarket.dto;

import com.dh.emarket.model.Image;
import org.hibernate.mapping.List;

import java.util.ArrayList;
import java.util.Base64;

import com.dh.emarket.repository.ImageRepository;

public class ImageDTO {

    //ATRIBUTOS
    private Long id;
    private String fileName;
    private String fileType;
    private String dataBase64;

    // Constructor sin argumentos
    public ImageDTO() {}

    // Constructor con argumentos
    public ImageDTO(Long id, String fileName, String fileType, String dataBase64) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.dataBase64 = dataBase64;
    }

    //setters y getters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getDataBase64() {
        return dataBase64;
    }

    public void setDataBase64(String dataBase64) {
        this.dataBase64 = dataBase64;
    }
}


