using Lab3MVC.Models.Domain;
using System.Data.SqlClient;
using Lab3MVC.Models.Data;

namespace Lab3MVC.Models.Data
{
    public class SpaceDAO
    {
        private readonly IConfiguration _configuration;
        string connectionString;


    public SpaceDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection"); ;
        }

        public int Insert(Space space)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            int capacity = space.Parking.Capacity;
            int number_space = 1;
            //space.Parking.Id = 1;
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {

                    while (capacity>0)
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand("InsertSpace", connection);
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@Number", number_space);
                        command.Parameters.AddWithValue("@Id_Type", space.Type.Id);
                        command.Parameters.AddWithValue("@Status", space.Status);
                        command.Parameters.AddWithValue("@Id_Vehicule", space.Vehicule.Id);
                        command.Parameters.AddWithValue("@Id_Parking", space.Parking.Id);
                        command.Parameters.AddWithValue("@Check_in", space.Check_In);
                        command.Parameters.AddWithValue("@Id_Rate", space.Rate.IdRate);


                        resultToReturn = command.ExecuteNonQuery();
                        connection.Close();
                        number_space++;
                        capacity--; 
                    }
                    

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }



        public List<Space> Get(int idparking)
        {

            List<Space> space = new List<Space>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllSpace", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id_Parking", idparking);

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {

                    space.Add(new Space
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Number = Convert.ToInt32(sqlDataReader["Number"]),
                        Type = new Vehicule_Type(0, sqlDataReader["Type_Name"].ToString()),
                        Status = sqlDataReader["Status"].ToString(),
                        Check_In = sqlDataReader["Check_In"].ToString(),
                        Rate = new Rate(Convert.ToInt32(sqlDataReader["Id_Rate"]),null, Convert.ToInt32(sqlDataReader["PerHour"]), Convert.ToInt32(sqlDataReader["PerHalfHour"]), Convert.ToInt32(sqlDataReader["PerDay"]), Convert.ToInt32(sqlDataReader["PerWeek"]), Convert.ToInt32(sqlDataReader["PerMonth"]), Convert.ToInt32(sqlDataReader["PerYear"])),
                        Vehicule = new Vehicule(0, sqlDataReader["Vehicule_LicensePlate"].ToString(),null,null,null,null),
                        Parking = new Parking(0, sqlDataReader["Parking_Name"].ToString(),0,null,null)

                    });

                }

                connection.Close();

                return space;

            }
        }

        public Space GetId(int id)
        {
            Space space = new Space();

            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("GetSpace", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Space", id);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        space.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        space.Number = Convert.ToInt32(sqlDataReader.GetInt32(1));
                        space.Type = new Vehicule_Type(Convert.ToInt32(sqlDataReader.GetInt32(2)), null);
                        space.Status = sqlDataReader.GetString(3);
                        space.Vehicule = new Vehicule(Convert.ToInt32(sqlDataReader.GetInt32(4)),null,null,null,null,null);
                        space.Parking = new Parking(Convert.ToInt32(sqlDataReader.GetInt32(5)), null,0,null,null);
                        space.Check_In = sqlDataReader.GetString(6);
                        space.Rate =new Rate (Convert.ToInt32(sqlDataReader.GetInt32(7)),null,0,0,0,0,0,0);
                    }

                    connection.Close();


                    return space;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }


        public int Update(Space space, string option)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
           
            //space.Parking.Id = 1;
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                        connection.Open();
                        SqlCommand command = new SqlCommand("UpdateSpace", connection);
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id_Space", space.Id);
                        command.Parameters.AddWithValue("@Number", space.Number);
                        command.Parameters.AddWithValue("@Id_Type", space.Type.Id);
                        command.Parameters.AddWithValue("@Status", space.Status);
                        command.Parameters.AddWithValue("@Id_Vehicule", space.Vehicule.Id);
                        command.Parameters.AddWithValue("@Id_Parking", space.Parking.Id);
                        command.Parameters.AddWithValue("@Check_In", space.Check_In);
                        command.Parameters.AddWithValue("@Id_Rate", space.Rate.IdRate);


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



        public int Delete(Space space)
        {

            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteSpace", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Space", space.Id);

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



