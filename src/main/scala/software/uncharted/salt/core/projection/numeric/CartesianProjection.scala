/*
 * Copyright 2016 Uncharted Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package software.uncharted.salt.core.projection.numeric

import org.apache.spark.sql.Row

/**
 * A projection into 2D cartesian (z,x,y) space
 *
 * @param min the minimum value of a data-space coordinate (minX, minY)
 * @param max the maximum value of a data-space coordinate (maxX, maxY)
 * @param zoomLevels the TMS/WMS zoom levels to project into
 */
class CartesianProjection(
  zoomLevels: Seq[Int],
  min: (Double, Double),
  max: (Double, Double)
) extends NumericProjection[(Double, Double), (Int, Int, Int), (Int, Int)](min, max) {

  //Precompute some stuff we'll use frequently
  val _xRange = max._1 - min._1
  val _yRange = max._2 - min._2

  override def project (dCoords: Option[(Double, Double)], maxBin: (Int, Int)): Option[Seq[((Int, Int, Int), (Int, Int))]] = {
    if (!dCoords.isDefined) {
      None
    } else if (dCoords.get._1 >= max._1 || dCoords.get._1 < min._1 || dCoords.get._2 >= max._2 || dCoords.get._2 < min._2) {
      //make sure that we always stay INSIDE the range
      None
    } else {
      val translatedDataX = dCoords.get._1 - min._1
      val translatedDataY = dCoords.get._2 - min._2
      //scale it to [0,1)
      val scaledDataX = translatedDataX / _xRange
      val scaledDataY = translatedDataY / _yRange

      //compute all tile/bin coordinates (z, x, y, bX, bY)
      Some(zoomLevels.map(z => {
        val n = Math.pow(2, z).toInt;
        val howFarX = scaledDataX * n
        val howFarY = scaledDataY * n
        val x = howFarX.toInt
        val y = howFarY.toInt
        val xBin = ((howFarX - x)*(maxBin._1 + 1)).toInt
        val yBin = (maxBin._2) - ((howFarY - y)*(maxBin._2 + 1)).toInt
        ((z, x, y), (xBin, yBin))
      }))
    }
  }

  override def binTo1D(bin: (Int, Int), maxBin: (Int, Int)): Int = {
    bin._1 + bin._2*(maxBin._1 + 1)
  }
  override def binFrom1D(index: Int, maxBin: (Int, Int)): (Int, Int) = {
    val bins = maxBin._1 + 1

    val x = index % bins
    (x, (index - x) / bins)
  }
}
