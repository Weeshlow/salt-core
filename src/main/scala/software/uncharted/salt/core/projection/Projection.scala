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

package software.uncharted.salt.core.projection

/**
 * A mapping from data-space to visualization-space (tile/bin coordinate).
 * While there are potentially an infinite number of tiles, each tile
 * is finite in terms of the number of bins.
 *
 * @tparam DC the abstract type representing a data-space coordinate
 * @tparam TC the abstract type representing a tile coordinate.
 * @tparam BC the abstract type representing a bin coordinate. Must be something that can be represented in 1 dimension.
 */
abstract class Projection[DC, TC, BC]() extends Serializable {

  /**
   * Project a data-space coordinate into the corresponding tile coordinate and bin coordinate
   * @param dc the data-space coordinate
   * @param maxBin The maximum possible bin index (i.e. if your tile is 256x256, this would be (255,255))
   * @return Option[Traversable[(TC, Int)]] representing a series of tile coordinate/bin index pairs if the given source
   *         row is within the bounds of the viz. None otherwise.
   */
  def project(dc: Option[DC], maxBin: BC): Option[Traversable[(TC, BC)]]

  /**
   * Project a bin index BC into 1 dimension for easy storage of bin values in an array
   * @param bin A bin index
   * @param maxBin The maximum possible bin index (i.e. if your tile is 256x256, this would be (255,255))
   * @return the bin index converted into its one-dimensional representation
   */
  def binTo1D(bin: BC, maxBin: BC): Int

  /**
    * Project a 1 dimensional index into a bin index for easy retrieval of bin values from an array
    * @param index An array index
    * @param maxBin The maximum possible bin index (i.e. if your tile is 256x256, this would be (255, 255))
    * @return The bin index indicated by this one dimensional representation
    */
  def binFrom1D (index: Int, maxBin: BC): BC
}
