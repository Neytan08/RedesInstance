using Lab3MVC.Models.Domain;
using System.Data.SqlClient;

namespace Lab3MVC.Models.Data
{
    public class VehiculeDAO
    {
        private readonly IConfiguration _configuration;
        string connectionString;

        public VehiculeDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public int Insert(Vehicule vehicule)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("InsertVehicule", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@License_Plate", vehicule.License_Plate);
                    command.Parameters.AddWithValue("@Color", vehicule.Color);
                    command.Parameters.AddWithValue("@Brand", vehicule.Brand);
                    command.Parameters.AddWithValue("@Id_User", vehicule.User.Id);
                    command.Parameters.AddWithValue("@Id_Type", vehicule.Vehicule_type.Id);

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

        public List<Vehicule> Get()
        {

            List<Vehicule> vehicules = new List<Vehicule>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllVehicule", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {

                    vehicules.Add(new Vehicule
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        License_Plate = sqlDataReader["License_Plate"].ToString(),
                        Color = sqlDataReader["Color"].ToString(),
                        Brand = sqlDataReader["Brand"].ToString(),
                        
                        Vehicule_type = new Vehicule_Type(0, sqlDataReader["Vehicule_TypeName"].ToString())

                    });

                }

                connection.Close();

                return vehicules;

            }
        }



        public Vehicule Get(string license_Plate)
        {
            Vehicule vehicule = new Vehicule();
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("GeVehicule", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@License_Plate", license_Plate);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        vehicule.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        vehicule.License_Plate = sqlDataReader.GetString(1);
                        vehicule.Color = sqlDataReader.GetString(2);
                        vehicule.Brand = sqlDataReader.GetString(3);
                        vehicule.Vehicule_type = new Vehicule_Type(Convert.ToInt32(sqlDataReader.GetInt32(4)), null);

                    }

                    connection.Close();


                    return vehicule;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }


        public List<Vehicule> GetVehiculeUser(Vehicule vehicule)
        {

            List<Vehicule> vehicules = new List<Vehicule>();
         
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                        connection.Open();
                    SqlCommand command = new SqlCommand("GetVehiculeUser", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@idUser", Convert.ToInt32(vehicule.User.Id));

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    while (sqlDataReader.Read())
                    {

                        vehicules.Add(new Vehicule
                        {
                            Id = Convert.ToInt32(sqlDataReader["Id"]),
                            License_Plate = sqlDataReader["License_Plate"].ToString(),
                            Color = sqlDataReader["Color"].ToString(),
                            Brand = sqlDataReader["Brand"].ToString(),

                            Vehicule_type = new Vehicule_Type(0, sqlDataReader["Vehicule_TypeName"].ToString())

                        });

                    }

                    connection.Close();


                    return vehicules;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }

        public int Update(Vehicule vehicule)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("UpdateVehicule", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Id_Vehicule", vehicule.Id);
                    command.Parameters.AddWithValue("@License_Plate", vehicule.License_Plate);
                    command.Parameters.AddWithValue("@Color", vehicule.Color);
                    command.Parameters.AddWithValue("@Brand", vehicule.Brand);
                    command.Parameters.AddWithValue("@Id_User", vehicule.User.Id);
                    command.Parameters.AddWithValue("@Id_Type", vehicule.Vehicule_type.Id);
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



        public int Delete(Vehicule vehicule)
        {

            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteVehicule", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Vehicule", vehicule.Id);

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
