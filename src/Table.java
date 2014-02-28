import java.util.ArrayList;
import java.util.Iterator;

class Table implements Iterable
{
	@Override
	public Iterator iterator()
	{
		return new TableIterator(rows);
	}

	class TableRow
	{
		public TableRow (float x, float y, float r) {
			this.x = x;
			this.y = y;
			this.r = r;
		}

		public final float x;
		public final float y;
		public final float r;
		public boolean hit;
	}

	private final TableRow[] rows;
	private PointChecker checker;

	public Table(float[] x, float y, float r)
	{
		rows = new TableRow[x.length];

		for (int i = 0; i < x.length; i++)
		{
			rows[i] = new TableRow(x[i], y, r);
		}
	}

	public void setChecker(PointChecker checker)
	{
		this.checker = checker;
	}
}