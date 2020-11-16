class SongsController < ApplicationController
  before_action :set_song, only: [:show, :update, :destroy]

  # GET /songs
  def index
        songs = Song.all
        render json: {status: 200, songs: songs}
    end

  # GET /songs/1
  def show
    song = Song.find(params[:id])
    render(json: {song: song})
  end

  # POST /songs
  def create
    song = Song.new(song_params)
    if song.save
      render json: { song: song }
    else
      render(status: 422, json: { song: song, errors: song.errors })
    end
  end

  # PATCH/PUT /songs/1
  def update
    song = Song.find(params[:id])
    song.update(song_params)
    render(status: 200, json: {song:song})
  end

  # DELETE /songs/1
  def destroy
    song = Song.destroy(params[:id])
    render(status: 204)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def song_params
      params.require(:song).permit(:title, :artist, :time, :fav)
    end
  end 
