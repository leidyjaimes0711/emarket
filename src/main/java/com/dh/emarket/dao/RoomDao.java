package com.dh.emarket.dao;

import com.dh.emarket.model.Room;

import java.security.PrivateKey;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RoomDao implements IDao<Room>{

    private static final String SQL_INSERT = "INSERT INTO ROOM " +
            "(NAME, DESCRIPTION) VALUES" +
            " (?, ?);";

    private static final String SQL_SELECT_ID = "SELECT * FROM ROOM WHERE ID = ?";

    private static final String SQL_UPDATE = "UPDATE ROOM SET NAME = ?, DESCRIPTION = ? WHERE ID = ?";

    private static final String SQL_DELETE = "DELETE FROM ROOM WHERE ID = ?";
    private static final String SQL_SELECT_ALL = "SELECT * FROM ROOM";


    @Override
    public Room save(Room room) {
        Connection connection = null;
        try{
            connection = DB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS);
            //guarda los datos que recibe por parametro
            preparedStatement.setString(1, room.getName());
            preparedStatement.setString(2, room.getDescription());
            preparedStatement.execute();

            //recupera el id en el que iba llenandose la tabla
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            while (resultSet.next()){
                room.setId(resultSet.getLong(1));
            }

        }catch(Exception e){
            e.printStackTrace();
        } finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return room;
    }

    @Override
    public Room findById(Long id) {
        Connection connection = null;
        Room room = null;
        try{
            connection = DB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_SELECT_ID);
            preparedStatement.setLong(1, id);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                room = new Room(resultSet.getLong(1), resultSet.getString(2), resultSet.getString(3));
            }

        }catch(Exception e){
            e.printStackTrace();
        } finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return room;
    }

    @Override
    public void update(Room room) {
        Connection connection = null;
        try{
            connection = DB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_UPDATE);
            preparedStatement.setString(1, room.getName());
            preparedStatement.setString(2, room.getDescription());
            preparedStatement.setLong(1, room.getId());
            preparedStatement.execute();

        }catch(Exception e){
            e.printStackTrace();
        } finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    @Override
    public void delete(Long id) {
        Connection connection = null;
        try{
            connection = DB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_DELETE);
            preparedStatement.setLong(1, id);
            preparedStatement.execute();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }

    }

    @Override
    public List<Room> findAll() {
        Connection connection = null;
        Room room = null;
        List<Room> roomList = new ArrayList<>();
        try{
            connection = DB.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_SELECT_ALL);

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                room = new Room(resultSet.getLong(1), resultSet.getString(2), resultSet.getString(3));
                roomList.add(room);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return roomList;
    }

    @Override
    public Room findByString(String value) {
        return null;
    }
}
