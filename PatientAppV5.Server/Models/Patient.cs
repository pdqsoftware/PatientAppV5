using System.ComponentModel.DataAnnotations;
using System;


namespace PatientAppV5.Server.Models
{
    public class Patient
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Surname { get; set; }

        [Required]
        public required string SouthAfricanIdNumber { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public double? WeightKg { get; set; }
        public double? HeightCm { get; set; }

        public required string Gender { get; set; }

        // Add a new column
        // public string? HomeTown { get; set; }
    }
}
