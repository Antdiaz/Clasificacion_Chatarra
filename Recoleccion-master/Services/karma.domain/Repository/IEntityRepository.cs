using System.Linq;

namespace karma.domain.Repository
{
    public interface IEntityRepository<TEntity>
    {
        IQueryable<TEntity> GetAll();
        TEntity Get(int id);
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
    }
}