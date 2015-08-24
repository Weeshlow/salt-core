package com.unchartedsoftware.mosaic.core.projection

/**
 * Represents an abstract quad-tree tile coordinate
 * which, at the very least, has a concept of zoom
 * level
 */
abstract class TileCoord(var z: Int) extends Serializable {
  def this() = {
    this(0)
  }

  override def equals(other: Any) = {
    other match {
      case t: TileCoord => t.z == z
      case _ => false
    }
  }
}