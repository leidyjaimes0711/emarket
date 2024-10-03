package com.emarket.emarket.dao;
import com.emarket.emarket.model.Room;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
public class RoomDao implements IDao<Room> {

    private static final String SQL_INSERT = "INSERT INTO ROOM (NAME," +
            "DESCRIPTION,IMAGEURL) VALUES (?,?,?)";

    private static final String SQL_SELECT_ID = "SELECT * FROM ROOM" +
            " WHERE ID=?";

    private static final String SQL_UPDATE = "UPDATE ROOM SET NAME=?," +
            "DESCRIPTION=?, IMAGEURL=? WHERE ID=?";

    private static final String SQL_DELETE = "DELETE FROM ROOM WHERE ID=?";

    private static final String SQL_SELECT_ALL = "SELECT * FROM ROOM";
    @Override
    public Room save(Room room) {
        Connection connection = null;
        try {
            connection = DB.getConnection();
            assert connection != null;
            PreparedStatement ps = connection.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, room.getName());
            ps.setString(2, room.getDescription());
            ps.setString(3, room.getImageUrl());
            ps.execute();

            ResultSet rs = ps.getGeneratedKeys();
            while (rs.next()) {
                room.setId(rs.getInt(1));
            }

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return room;
    }

    @Override
    public Room findById(Integer id) {
        Connection connection = null;
        Room room = null;
        try {
            connection = DB.getConnection();
            PreparedStatement ps = connection.prepareStatement(SQL_SELECT_ID);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                room = new Room (rs.getInt(1), rs.getString(2),
                        rs.getString(3), rs.getString(4)) ;
            }

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return room;
    }


    @Override
    public void update(Room room) {
        Connection connection = null;
        try {
            connection = DB.getConnection();
            PreparedStatement ps = connection.prepareStatement(SQL_UPDATE);
            ps.setInt(1, room.getId());
            ps.setString(2, room.getName());
            ps.setString(3, room.getDescription());
            ps.setString(4, room.getImageUrl());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void delete(Integer id) {
        Connection connection = null;
        try {
            connection = DB.getConnection();
            PreparedStatement ps = connection.prepareStatement(SQL_DELETE);
            ps.setInt(1, id);
            ps.execute();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public List<Room> findAll() {
        Connection connection = null;
        Room room = null;
        List<Room> dentistList = new ArrayList<>();
        try {
            connection = DB.getConnection();
            PreparedStatement ps = connection.prepareStatement(SQL_SELECT_ALL);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                room = new Room(rs.getInt(1), rs.getString(2),
                        rs.getString(3), rs.getString(4));
                dentistList.add(room);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return dentistList;
    }

    @Override
    public Room findByString(String value) {
        return null;
    }
}
