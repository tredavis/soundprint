using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoundPrint.Data.Model
{
    public class Track
    {
        [Key]
        public int TrackId { get; set; }
        public string TrackName { get; set; }
    }
}
