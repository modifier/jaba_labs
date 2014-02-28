import java.util.Iterator;

/**
 * Created by Modifier on 28.02.14.
 */
public class TableIterator implements Iterator
{
	protected int i = 0;
	protected Table.TableRow[] rows;

	public TableIterator (Table.TableRow[] rows)
	{
		this.rows = rows;
	}

	@Override
	public boolean hasNext()
	{
		return i < rows.length - 1;
	}

	@Override
	public Object next()
	{
		return rows[i++];
	}

	@Override
	public void remove()
	{
		throw new UnsupportedOperationException();
	}
}
