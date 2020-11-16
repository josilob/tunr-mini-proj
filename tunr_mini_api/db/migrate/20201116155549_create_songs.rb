class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :time
      t.boolean :fav

      t.timestamps
    end
  end
end
