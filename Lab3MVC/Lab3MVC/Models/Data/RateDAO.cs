using Lab3MVC.Models.Domain;
using System.Data.SqlClient;

namespace Lab3MVC.Models.Data
{

    public class RateDAO
    {

        private readonly IConfiguration _configuration;
        string connectionString;

        public RateDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public int Insert(Rate rate)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("InsertRate", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    
                    command.Parameters.AddWithValue("@Id_Type", rate.VehiculeType.Id);
                    command.Parameters.AddWithValue("@Per_Hour", rate.PerHour);
                    command.Parameters.AddWithValue("@Per_HalfHour", rate.PerHalfHour);
                    command.Parameters.AddWithValue("@Per_Day", rate.PerDay);
                    command.Parameters.AddWithValue("@Per_Week", rate.PerWeek);
                    command.Parameters.AddWithValue("@Per_Month", rate.PerMonth);
                    command.Parameters.AddWithValue("@Per_Year", rate.PerYear);
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

        public Rate Get(int id)
        {
            Rate rate = new Rate();
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("GetRate", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Rate", id);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        rate.IdRate = Convert.ToInt32(sqlDataReader["Id"]);
                        rate.VehiculeType = new Vehicule_Type(Convert.ToInt32(sqlDataReader["VehiculeType"]),null);
                        rate.PerHour = Convert.ToInt64(sqlDataReader["Hour"]);
                        rate.PerHalfHour = Convert.ToInt64(sqlDataReader["HalfHour"]);
                        rate.PerDay = Convert.ToInt64(sqlDataReader["Day"]);
                        rate.PerWeek = Convert.ToInt64(sqlDataReader["Week"]);
                        rate.PerMonth = Convert.ToInt64(sqlDataReader["Month"]);
                        rate.PerYear = Convert.ToInt64(sqlDataReader["Year"]);
                    }

                    connection.Close();


                    return rate;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }


        public List<Rate> Get()
        {

            List<Rate> rate = new List<Rate>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllRate", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    rate.Add(new Rate
                    {
                        IdRate = Convert.ToInt32(sqlDataReader["Id"]),
                        VehiculeType = new Vehicule_Type(0, sqlDataReader["VehiculeType"].ToString()),
                        PerHour = Convert.ToInt64( sqlDataReader["Hour"]),
                        PerHalfHour = Convert.ToInt64(sqlDataReader["HalfHour"]),
                        PerDay = Convert.ToInt64(sqlDataReader["Day"]),
                        PerWeek = Convert.ToInt64(sqlDataReader["Week"]),
                        PerMonth = Convert.ToInt64(sqlDataReader["Month"]),
                        PerYear = Convert.ToInt64(sqlDataReader["Year"]),

                    });

                }
                connection.Close();
                return rate;

            }
        }



        public int Update(Rate rate)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("UpdateRate", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Rate", rate.IdRate);
                    command.Parameters.AddWithValue("@Id_Type", rate.VehiculeType.Id);
                    command.Parameters.AddWithValue("@Per_Hour", rate.PerHour);
                    command.Parameters.AddWithValue("@Per_HalfHour", rate.PerHalfHour);
                    command.Parameters.AddWithValue("@Per_Day", rate.PerDay);
                    command.Parameters.AddWithValue("@Per_Week", rate.PerWeek);
                    command.Parameters.AddWithValue("@Per_Month", rate.PerMonth);
                    command.Parameters.AddWithValue("@Per_Year", rate.PerYear);
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





        public int Delete(int id)
        {

            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteRate", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Rate", id);

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


