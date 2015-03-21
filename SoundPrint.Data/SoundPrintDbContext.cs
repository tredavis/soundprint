using Microsoft.AspNet.Identity.EntityFramework;
using SoundPrint.Data.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoundPrint.Data
{
    public class SoundPrintDbContext : IdentityDbContext<ApplicationUser>
    {
        public SoundPrintDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<Artist> Artist { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public static SoundPrintDbContext Create()
        {
            return new SoundPrintDbContext();
        }
    }
}
