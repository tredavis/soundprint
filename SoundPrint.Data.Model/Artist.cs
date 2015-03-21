using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoundPrint.Data.Model
{
    public class Artist
    {
        [Key]
        public int ArtistId { get; set; }

        public string Name { get; set; }

    }
}
