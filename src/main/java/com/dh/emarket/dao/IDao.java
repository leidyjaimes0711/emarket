package com.dh.emarket.dao;

import java.util.List;

public interface IDao<T> {

    T save(T t);
    T findById(Long id);
    void update(T t);
    void delete(Long id);
    List<T> findAll();
    T findByString(String value);
}
