package com.dh.emarket.dao;

import com.dh.emarket.model.Image;
import com.dh.emarket.model.Room;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
@Repository
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
        PreparedStatement preparedStatement = null;
        PreparedStatement imageStmt = null;

        try {
            connection = DB.getConnection();
            connection.setAutoCommit(false); // Desactivar el auto-commit

            // Guardar los datos de la habitación
            preparedStatement = connection.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, room.getName());
            preparedStatement.setString(2, room.getDescription());
            preparedStatement.execute();

            // Recuperar el ID generado para la habitación
            ResultSet resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                room.setId(resultSet.getLong(1));
            }

            // Guardar las imágenes asociadas a la habitación
            if (room.getImages() != null && !room.getImages().isEmpty()) {
                String imageInsertQuery = "INSERT INTO image (file_name, file_type, data, room_id) VALUES (?, ?, ?, ?)";
                imageStmt = connection.prepareStatement(imageInsertQuery);

                for (Image image : room.getImages()) {
                    imageStmt.setString(1, image.getFileName());
                    imageStmt.setString(2, image.getFileType());
                    imageStmt.setBytes(3, image.getData());
                    imageStmt.setLong(4, room.getId()); // Relacionar la imagen con la habitación
                    imageStmt.executeUpdate();
                }
            }

            connection.commit(); // Confirmar la transacción si todo va bien

        } catch (Exception e) {
            if (connection != null) {
                try {
                    connection.rollback(); // Revertir la transacción en caso de error
                } catch (Exception rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            e.printStackTrace();
        } finally {
            try {
                if (preparedStatement != null) {
                    preparedStatement.close(); // Cerrar el PreparedStatement
                }
                if (imageStmt != null) {
                    imageStmt.close(); // Cerrar el PreparedStatement de las imágenes
                }
                if (connection != null) {
                    connection.close(); // Cerrar la conexión
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return room;
    }

    @Override
    public Room findById(Long id) {

        Connection connection = null;
        Room room = null;
        List<Image> images = new ArrayList<>();  // Crear una lista de imágenes vacía
        try {
            connection = DB.getConnection();

            // Primero obtener los datos de la habitación
            PreparedStatement preparedStatement = connection.prepareStatement(SQL_SELECT_ID);
            preparedStatement.setLong(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                // Crear el objeto Room sin las imágenes todavía
                room = new Room(resultSet.getLong(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        new ArrayList<>());  // De momento, lista vacía para imágenes
            }

            // Ahora obtener las imágenes relacionadas con la habitación
            // Ahora obtener las imágenes relacionadas con la habitación
            if (room != null) {
                String imageQuery = "SELECT * FROM image WHERE room_id = ?";
                PreparedStatement imageStmt = connection.prepareStatement(imageQuery);
                imageStmt.setLong(1, room.getId());  // Usamos el ID de la habitación
                ResultSet imageResultSet = imageStmt.executeQuery();

                while (imageResultSet.next()) {
                    Image image = new Image();
                    image.setId(imageResultSet.getLong("id"));
                    image.setFileName(imageResultSet.getString("file_name"));
                    image.setFileType(imageResultSet.getString("file_type"));
                    image.setData(imageResultSet.getBytes("data"));
                    images.add(image);
                }
                // Ahora que tenemos las imágenes, las agregamos al objeto Room
                room.setImages(images);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
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
            preparedStatement.setLong(3, room.getId());
            preparedStatement.execute();

        }catch(Exception e){
            e.printStackTrace();
        } finally {
            try{
                assert connection != null;
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
        return null;
    }


    @Override
    public Room findByString(String value) {
        return null;
    }
}