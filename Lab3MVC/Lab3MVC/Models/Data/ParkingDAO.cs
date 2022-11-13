using Lab3MVC.Models.Domain;
using System.Data.SqlClient;

namespace Lab3MVC.Models.Data
{
    public class ParkingDAO
    {
        //private static string confi = @"Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx";
        private readonly IConfiguration _configuration;
        string connectionString;

        public ParkingDAO(IConfiguration configuration)
        {
            // _configuration = configuration;
            // connectionString = _configuration.GetConnectionString("Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx");

            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }


        public Parking Insert(Parking parking)
        {
            Parking parkingNew = new Parking();
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("InsertParking", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Name_Parking", parking.Name);
                    command.Parameters.AddWithValue("@Capacity", parking.Capacity);
                    command.Parameters.AddWithValue("@Province", parking.Province);
                    command.Parameters.AddWithValue("@District", parking.District);
                    resultToReturn = command.ExecuteNonQuery();

                    connection.Close();

                    parkingNew = GetName(parking); 
                    return parkingNew;

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }

        }


        public List<Parking> Get() //ya no es void, sino una lista
        {

            List<Parking> parking = new List<Parking>();

            //usaremos using para englobar todo lo que tiene que ver con una misma cosa u objeto. En este caso, todo lo envuelto acá tiene que ver con connection, la cual sacamos con la clase SqlConnection y con el string de conexión que tenemos en nuestro appsetting.json
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("GetAllParking", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo. 
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP

                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    parking.Add(new Parking
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Name = sqlDataReader["Name_Parking"].ToString(),
                        Capacity = Convert.ToInt32(sqlDataReader["Capacity"]),
                        Province = sqlDataReader["Province"].ToString(),
                        District = sqlDataReader["District"].ToString()

                    });

                }

                connection.Close(); //cerramos conexión. 

            return parking; //retornamos resultado al Controller.  

        }
    }

        public Parking Get(Parking parking)
        {
            User user = new User();
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                using (SqlCommand command = new SqlCommand("GetParking", connection))
                {

                    connection.Open();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Parking", parking.Id);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        parking.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        parking.Name = sqlDataReader.GetString(1);
                        parking.Capacity = Convert.ToInt32(sqlDataReader.GetInt32(2));
                        parking.Province = sqlDataReader.GetString(3);
                        parking.District = sqlDataReader.GetString(4);
                    }

                    connection.Close();


                    return parking;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }

        public Parking GetName(Parking parking)
        {
           
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                using (SqlCommand command = new SqlCommand("GetNameParking", connection))
                {

                    connection.Open();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Name_Parking", parking.Name);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        parking.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        parking.Name = sqlDataReader.GetString(1);
                        parking.Capacity = Convert.ToInt32(sqlDataReader.GetInt32(2));
                        parking.Province = sqlDataReader.GetString(3);
                        parking.District = sqlDataReader.GetString(4);
                    }

                    connection.Close();


                    return parking;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }



        public int Update(Parking parking)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("UpdateParking", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Id_Parking", parking.Id);
                    command.Parameters.AddWithValue("@Name_Parking", parking.Name);
                    command.Parameters.AddWithValue("@Capacity", parking.Capacity);
                    command.Parameters.AddWithValue("@Province", parking.Province);
                    command.Parameters.AddWithValue("@District", parking.District);



                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }



        public int Delete(Parking parking)
        {

            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteParking", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Parking", parking.Id);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }

    }
}
